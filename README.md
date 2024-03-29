# Friday.BOT

[![Powered by Wechaty](https://img.shields.io/badge/Powered%20By-Wechaty-brightgreen.svg)](https://wechaty.js.org)
[![Node.js CI](https://github.com/wechaty/friday/workflows/Node.js%20CI/badge.svg)](https://github.com/wechaty/friday/actions?query=workflow%3A%22Node.js+CI%22)
[![Docker](https://github.com/wechaty/friday/workflows/Docker/badge.svg)](https://github.com/wechaty/friday/actions?query=workflow%3ADocker)
[![ES Modules](https://img.shields.io/badge/ES-Modules-brightgreen)](https://github.com/Chatie/tsconfig/issues/16)

Friday Bot is designed for serving the Wechaty community purpose.

![Friday](docs/images/friday.svg)

> Image: [Five Dollar Friday](https://www.robsdogs.net.au/product/five-dollar-friday/)

## Staging

We are current DevOps the master branch from the repo to Heroku under the protection of GitHub Actions.

You can visit the staging system at <http://friday.chatie.io/>

## DDD & CQRS

- [Refactoring Friday BOT with NestJS, Domain-driven Design (DDD), and CQRS, @huan, Feb 27, 2022](https://wechaty.js.org/2022/02/27/refactoring-friday-bot-with-nestjs-ddd-cqrs/)
- [CQRS Wechaty](https://github.com/wechaty/cqrs): An event-driven architecture wrapper for Wechaty that applies the CQS principle by using separate Query and Command messages to retrieve and modify the bot state, respectively.

## Contributors

[![contributor](https://sourcerer.io/fame/huan/wechaty/friday/images/0)](https://sourcerer.io/fame/huan/wechaty/friday/links/0)
[![contributor](https://sourcerer.io/fame/huan/wechaty/friday/images/1)](https://sourcerer.io/fame/huan/wechaty/friday/links/1)
[![contributor](https://sourcerer.io/fame/huan/wechaty/friday/images/2)](https://sourcerer.io/fame/huan/wechaty/friday/links/2)
[![contributor](https://sourcerer.io/fame/huan/wechaty/friday/images/3)](https://sourcerer.io/fame/huan/wechaty/friday/links/3)
[![contributor](https://sourcerer.io/fame/huan/wechaty/friday/images/4)](https://sourcerer.io/fame/huan/wechaty/friday/links/4)
[![contributor](https://sourcerer.io/fame/huan/wechaty/friday/images/5)](https://sourcerer.io/fame/huan/wechaty/friday/links/5)
[![contributor](https://sourcerer.io/fame/huan/wechaty/friday/images/6)](https://sourcerer.io/fame/huan/wechaty/friday/links/6)
[![contributor](https://sourcerer.io/fame/huan/wechaty/friday/images/7)](https://sourcerer.io/fame/huan/wechaty/friday/links/7)

## History

### master v1.13 Jan 29, 2022

Use [NestJS](https://docs.nestjs.com/recipes/cqrs) to build the server.

#### DDD & CQS

- [Layers in DDD microservices](https://docs.microsoft.com/en-us/dotnet/architecture/microservices/microservice-ddd-cqrs-patterns/ddd-oriented-microservice#layers-in-ddd-microservices)
- Effective Aggregate Design
  - [Part I: Modeling a Single Aggregate](https://www.dddcommunity.org/wp-content/uploads/files/pdf_articles/Vernon_2011_1.pdf)
  - [Part II: Making Aggregates Work Together](https://www.dddcommunity.org/wp-content/uploads/files/pdf_articles/Vernon_2011_2.pdf)
  - [Part III: Gining Insight Through Discovery](https://www.dddcommunity.org/wp-content/uploads/files/pdf_articles/Vernon_2011_3.pdf)
- [Domain-Application-Infrastructure Services pattern](https://badia-kharroubi.gitbooks.io/microservices-architecture/content/patterns/tactical-patterns/domain-application-infrastructure-services-pattern.html)

#### Tips & Troubleshooting

1. Do not use `import type {} from 'xxx'` to import a Injectable. Use `import {} from 'xxx'` instead to import the values.
1. Every `Handlers`, `Commands`, `Queries` classe must have a `Handler` class because NestJS requires the decorator `@{Command,Events,Query}Handler()` to register those classes. You will get error `TypeError: Cannot read properties of undefined (reading 'id') at EventBus.defaultGetEventId [as getEventId]` if you forget to register the handler class.

## v0.11 (Dec 2021)

1. ES Module support

### v0.9 (Aug 22, 2020) On Gitter

[Gitter.im](https://gitter.im/wechaty/wechaty) synced with WeChat rooms!

1. Start using [wechaty-puppet-gitter](https://github.com/wechaty/wechaty-puppet-gitter) to sync message between puppets.

### v0.8 (Aug 4, 2020) On Tecent Official Account Platform!

1. The first version that managing two Wechaty bots together!
1. Start using [wechaty-puppet-official-account](https://github.com/wechaty/wechaty-puppet-official-account)

### v0.6 (Jul 18, 2020) Added Wechaty Vorpal CLI Comands!

1. Fully powered by [Wechaty Vorpal](https://github.com/wechaty/wechaty-vorpal) and [Wechaty Vorpal Contrib](https://github.com/wechaty/wechaty-vorpa-contrib) commands!
1. Restructure directories & source code files
1. Add Dockerfile so that we can deploy Friday.BOT with the power of Docker!

### v0.4 (Jun 15, 2020) Refactored with Wechaty Plugin!

1. Fully powered by Wechaty Plugins! See: [wechaty-plugin-contrib](https://github.com/wechaty/wechaty-plugin-contrib)
1. Restructure directories & source code files

### v0.2 (Dec 25, 2019) Added Basic Functions

Basic functions like:

1. Room Inviter (by ...)
1. Vote Out (by @windmemory)
1. Crontab (by @qhduan)
1. etc.

### v0.0.1 (Aug 23, 2019)

Friday Bot initialized by BOT5.Club members.

## Maintainers

- [Huan](https://github.com/huan) [(李卓桓)](http://linkedin.com/in/zixia) Creator of [Wechaty](https://github.com/wechaty/wechaty), Tencent TVP of Chatbot, <zixia@zixia.net>
- [Rui](https://github.com/lijiarui) [(李佳芮)](https://lijiarui.github.io) Co-creator of [Wechaty](https://github.com/wechaty/wechaty), Founder & CEO of [JuziBot](https://www.juzi.bot/)
- [Yuan](https://github.com/windmemory) (高原) Co-founder & CTO of [JuziBot](https://www.juzi.bot/)
- [Hua](https://github.com/qhduan) (段清华) Founder & CTO of [KDF.ai](https://kdf.ai)

See: <https://github.com/orgs/wechaty/teams/chairs/members>

## Sponsors

1. Google Cloud credits are provided for this project. #GeminiSprint

## Copyright & License

- Code & Docs © 2019-now Wechaty Contributors
- Code released under the Apache-2.0 License
- Docs released under Creative Commons
