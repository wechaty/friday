# ChatOps Vorpal Commands

## Calculate member number in all Wechaty Developers' Rooms

```ts
eval
  const roomList = await this.wechaty.Room.findAll({ topic: /Wechaty Developer/i });
  let total = 0;
  let text='Summary:\n';
  for (const room of roomList.sort((a,b)=>a.payload.topic.localeCompare(b.payload.topic))) {
    const memberList = await room.memberAll();
    text = text+'\n'+await room.topic()+': '+memberList.length;
    total = total+memberList.length;
  };
  text = text+'\nTotal: '+total;
  this.log(text);
```

## Kickout a member from room

```ts
eval
  const TOPIC     = /Home 6$/i;
  const BOB_REGEX = /^白菜$/;

  const matchName = name => BOB_REGEX.test(name);
  const room = await this.wechaty.Room.find({ topic: TOPIC   });
  if (!room) {
    this.log(`room not found for topic: ${TOPIC}`)
    return
  }

  const memberList = await room.memberAll();
  const bobList = memberList.filter(m => matchName(m.name()));
  if (bobList.length === 0) {
    await this.log(`${BOB_REGEX} not found in room ${TOPIC}`) ;
    return
  } else if (bobList.length > 1) {
    this.log(`there is more than one ${BOB_REGEX} in room ${TOPIC}`)
    return
  }

  const bob = bobList[0]
  await room.say(`You have violated the code of conduct of our Wechaty Developers' Room,
  we have to move you out of this room.`, bob);
  await this.wechaty.sleep(3 * 1000)
  await room.del(bob);
  await room.say('done');
  await this.log('removed ' + BOB_REGEX + ' from ' + TOPIC ) ;
```
