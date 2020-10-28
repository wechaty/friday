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

## Kickout a member in a room

To be fixed: <https://github.com/wechaty/wechaty-vorpal-contrib/issues/21>

```ts
eval
  const topic=/Home 6$/i;
  const bobName='白菜';
  const matchName = name => name === bobName;
  const room = await this.wechaty.Room.find({ topic });
  const memberList = await room.memberAll();
  const bob = memberList.filter(m => matchName(m.name()))[0];
  if (bob) {
    await room.say("You have violated the code of conduct of our Wechaty Developers' Room, we have to move you out of this room.", bob);
    await this.wechaty.sleep(3 * 1000)
    await room.del(bob);
    await room.say('done');
    await this.log('removed ' + bobName + ' from ' + topic);
  } else {
    await this.log('not found ' + bobName + ' from ' + topic);
  }
```
