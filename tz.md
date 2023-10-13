LOGIN - turli xilda register bo'lishi mumkin
  - signin (login password rememberMe) aggar rememberMe true bo'lsa refreshtni cookiega saqlaymiz va user va token jo'natamiz
    kiyin tekshiramiz loginni(login => phone yoki email) bilan bu passwordi is_active true bo'lishi kerak
    topilmasa email yoki password xato
  - kiyin passwordlarini machlashtiramiz agar password xato bo'lsa return error
  - check accout(type) blocklangan bo'lishi ham mumkin uni tekshirish kerak
  - status(deleted) ni ham tekshirish kerak deleted bo'lsa not found
  - agar status panding bo'lsa code generate qilib yuborish kerak verificatsiya qilish uchun panding faqat verificatsiyadan o'tmagan holatda bo'
    ladi email bo'lsa email phone bo'lsa phone yani nima bilan login bo'layotgan bo'lsa agar productionda bo'lsa sms jo'natish kerak queuega solib
  - verification code 3 min amal qiladi
  - agar status panding bo'lmasa user ma'lumotlarini beramiz uning rolelarini va perissionlarini agar rememberMe true bo'lsa shunga qarab ma'lumot jo'natamiz
  - 
