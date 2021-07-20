npm i

find ./src/graphics/. -maxdepth 1 -type d \( ! -name . \) -print0 | xargs -0 bash -c 'for directory; do cd $directory && pwd && npm i && cd ../../../; done' bash

npm run build