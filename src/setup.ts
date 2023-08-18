import { HttpStatus, INestApplication, ValidationPipe, VersioningType } from "@nestjs/common";
import { WsAdapter } from "@nestjs/platform-ws";
import cookieParser from "cookie-parser";
import helmet from "helmet";
import { corsOptions } from "./shared/options/cors.options";
import * as compression from 'compression';


function setUpApp(app: INestApplication) {
    app.use(cookieParser());
    app.useWebSocketAdapter(new WsAdapter(app));
    app.use(compression());
    app.use(
        helmet({
            contentSecurityPolicy: false,
            crossOriginEmbedderPolicy: false,
            crossOriginResourcePolicy: {
                policy: 'cross-origin',
            },
            frameguard: false,
        }),
    );
    app.useGlobalPipes(
        new ValidationPipe({
            whitelist: true,
            transform: true,
            errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY,
        }),
    );
    app.enableVersioning({
        type: VersioningType.URI,
        defaultVersion: '1',
    });
    app.enableCors(corsOptions);
}

export default setUpApp;