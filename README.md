# XRCLOUD Avatar Editor

This is an avatar editor used in the XRCLOUD service, a project based on Mozilla Hubs.

## Glossary

-   Blueprint: A collection of the avatar's skeleton and the parts added to the skeleton. Here, there are Male/Female blueprints.

## Creating Accessories and Custom Components

You can create custom components for the avatar by modeling the object in Blender. To add an avatar, refer to the following folders:

-   public/avatars/
-   src/AvatarEditor/blueprints

The generated avatar file must include the following essential components:

-   parts: Hand, Head
-   animations: Walking, WalkingBackwards, Running, RunningBackward, Idle

## License

-   This is MIT licensed.
-   The 3D models used in this app are ©2023-2024 by [CNU Metaversity](https://cnumeta.jnu.ac.kr/), under a [CC BY](https://creativecommons.org/licenses/by/4.0/) license.

## About the editor

-   The design of the avatar editor varies from service to service, so the source code is kept as simple as possible.
-   This avatar editor serves as an example. If you are using a framework other than React, it must be rewritten to suit that framework.
