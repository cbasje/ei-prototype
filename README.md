# ei-prototype

This application has a chat interface for an interaction I made during a course at my university. It communicates with another chat and an Arduino (that controls a rotary phone) via a WebSockets connection to a [NodeJS server](https://github.com/cbasje/ei-prototype-server).

## Stack

-   Framework: [Nuxt 3](https://nuxt.com/)
-   Styling: [TailwindCSS](https://tailwindcss.com/) + [daisyUI](https://daisyui.com/)
-   Icons: [Phosphor Icons](https://phosphoricons.com/)
-   Database communication: SocketIO

## Development

| Command      | Action                                      |
| :----------- | :------------------------------------------ |
| `yarn`       | Installs dependencies                       |
| `yarn dev`   | Starts local dev server at `localhost:3000` |
| `yarn build` | Builds production site to `./dist/`         |

## Audio download

```bash
youtube-dl --youtube-skip-dash-manifest -g --no-check-certificate "https://www.youtube.com/watch\?v\=nzsxoUtZvd0"

ffmpeg -ss 00:00:10.00 -i "FIRST OUTPUT URL" -t 00:00:20.00 -c copy environment.mp4
```
