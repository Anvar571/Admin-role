## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Docker

```bash
# build docker image
$ docker build --no-cache -t nest-api:<your version> .

# run container

$ docker compose up -d
```

## Simple project CI/CD Docker continer
Inventory system


User bo'ladi uning turli accounti bo'lishi mumkin masalan sotuvchi yoki xaridor bo'lishi mumkin
u saytga kirishida undaga account ko'rsatilishi kerak yani qaysi accountga kirasan deb google chromega o'xshash
va shu kirgan accountiga mos ma'lumotlarni chiqarishi kerak bo'ladi
va uning xuquqlari(premissions) bor

tasklarni jo'natadi agar mudatidan o'tgan bo'lsa jo'natilmaydi xato xabar qaytariladi "muddati o'tgan deb"
