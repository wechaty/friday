import { Injectable } from '@nestjs/common'
import { ICommand, ofType, Saga } from '@nestjs/cqrs'
import * as clc from 'cli-color'
import { Observable } from 'rxjs'
import { delay, map } from 'rxjs/operators'
import { DropAncientItemCommand } from '../commands/impl/drop-ancient-item.command.js'
import { ChatopsEvent } from '../events/impl/chatops.event.js'

const itemId = '0'

@Injectable()
export class BotsSagas {

  @Saga()
  dragonKilled (events$: Observable<any>): Observable<ICommand> {
    return events$
      .pipe(
        ofType(ChatopsEvent),
        delay(1000),
        map(event => {
          console.info(clc.redBright('Inside [HeroesGameSagas] Saga'))
          return new DropAncientItemCommand(event.roomId, itemId)
        }),
      )
  }

}
