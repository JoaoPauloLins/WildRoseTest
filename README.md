# Wild Rose Test


## Change log:
- [GameManager](https://github.com/JoaoPauloLins/WildRoseTest/commit/38bc2f89b9869762f2026b39a6d1a1ffdd17ddc4?diff=unified) => Added the percentage configurarion logic, and build up the matrix of tiles for each configuration. The single line and two lines configuration, have three possibilities of displaying the equal lines, depending on which random position it will get. For example, if the player gets the single line configuration, the equal line could be in the first line, second line or third line, depending which random number (1,2,3) the system gets.
- [Reel and Tile](https://github.com/JoaoPauloLins/WildRoseTest/commit/d9f3457f49b9566e11b91ab0de0249bb1f60a58e) => I created the Glow animation as a prefab, and then I put it inside the Tiles prefab, so that I can show or hide it. In the Tile class it was added the glow property, which is showed or hided in the setTile method. So, in the Reel class, when the changeCallback set a specific tile, that means that it belongs to a equal line of tiles. That is the moment where I show the glow animation.
