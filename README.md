# EI Prototype - Evaluation setup

## Audio download

```bash
youtube-dl --youtube-skip-dash-manifest -g --no-check-certificate "https://www.youtube.com/watch\?v\=nzsxoUtZvd0"

ffmpeg -ss 00:00:10.00 -i "FIRST OUTPUT URL" -t 00:00:20.00 -c copy environment.mp4
```
