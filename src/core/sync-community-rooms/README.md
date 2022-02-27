## Friday BOT DDD & CQRS

Friday BOT is using the below design patterns:

1. Domain-driven Design (DDD)
1. Command Query Responsibility Segregation

## Sub Domain: Sync Community Rooms

Sync messages between community rooms from different IM platforms.

## Saga Diagram

**Saga** is a program pipeline to react a specific Domain Event/Command by producing new Events/Commands to implement the business logic.

### Domain Saga: Event to Command

```mermaid
graph LR
  classDef event fill:DarkGoldenRod
  classDef command fill:blue
  classDef query fill:green

  ME(PuppetMessageReceivedEvent):::event
  GTE[fab:fa-gitter GitterCommunityMessageReceivedEvent]:::event
  WCE[fab:fa-weixin WeChatCommunityMessageReceivedEvent]:::event
  WAE[fab:fa-whatsapp WhatsAppCommunityMessageReceivedEvent]:::event
  QQE[fab:fa-qq QQCommunityMessageReceivedEvent]:::event

  WAC[fab:fa-whatsapp WhatsAppCommunitySendMessageCommand]:::command
  QQC[fab:fa-qq QQCommunitySendMessageCommand]:::command
  WCC[fab:fa-weixin WeChatCommunitySendMessageCommand]:::command
  GTC[fab:fa-gitter GitterCommunitySendMessageCommand]:::command

  S{Saga}
  GTS{fab:fa-gitter}
  WCS{fab:fa-weixin}
  WAS{fab:fa-whatsapp}
  QQS{fab:fa-qq}

  ME==>S

  subgraph Events Saga
    S-->GTE
    S-->WCE
    S-->QQE
    S-->WAE
  end

  subgraph Commands Saga
    GTE-->GTS
    GTS-->WAC
    GTS-->QQC
    GTS-->WCC
    
    WCE-->WCS
    WCS-->WAC
    WCS-->QQC
    WCS-->GTC
    
    WAE-->WAS
    WAS-->GTC
    WAS-->QQC
    WAS-->WCC

    QQE-->QQS
    QQS-->WAC
    QQS-->GTC
    QQS-->WCC
  end
```

## Command Saga: Domain to Application

### Text Message

```mermaid
graph LR
  subgraph Community Send Message Command Saga
    classDef event fill:DarkGoldenRod
    classDef command fill:blue
    classDef query fill:green

    CSC[CommunitySendTextMessageCommand]:::command
    SMC_S[fa:fa-signature SendMessageCommand Signature + Text]:::command
    
    TNQ[GetTalkerNameQuery]:::query
    CNQ[GetChannelNameQuery]:::query

    CSC-->CNQ & TNQ
    CNQ & TNQ --> SMC_S
  end
```

## Non-text Message

```mermaid
graph LR
  subgraph Community Send Message Command Saga
    classDef event fill:DarkGoldenRod
    classDef command fill:blue
    classDef query fill:green

    CSC[CommunitySendMessageCommand]:::command
    SMC_S[fa:fa-signature SendMessageCommand Signature]:::command
    SMC_N[fa:fa-photo-film SendMessageCommand Non-text]:::command
    
    TNQ[GetTalkerNameQuery]:::query
    CNQ[GetChannelNameQuery]:::query

    CSC-->CNQ & TNQ
    CNQ & TNQ --> SMC_S
    CSC-->SMC_N
  end
```

## Application & Domain

```mermaid
sequenceDiagram
    participant User
    participant Application
    participant Domain
    User->>Application: original message
    Application->>Domain: PuppetMessageReceivedEvent
    Domain->>Domain: XXXCommunityMessageReceivedEvent
    Domain->>Domain: XXXCommunitySendMessageCommand
    Domain->>Application: XXXQuery
    Application->>Domain: 
    Domain->>Application: PuppetSendMessageCommand
    Application->>User: forwarded message
```
