# codeship-telegram-bot
[ ![Codeship Status for freshfox/codeship-telegram-bot](https://app.codeship.com/projects/90185ee0-9cd1-0133-64d5-22509ada1533/status?branch=master)](https://app.codeship.com/projects/127260)

A Telegram bot that notifies you about your Codeship builds. Write him [@codeship_bot](https://telegram.me/codeship_bot)
on Telegram to get a web hook URL for your Codeship project.

By default the bot will notify you about failed builds and about the first successful build after a failed build. You can
append ```?mode=all``` to get all successful builds as well.