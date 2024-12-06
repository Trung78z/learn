package main

import (
	"net/http"
	"os"

	"github.com/Trung78z/learn/serverGo/config"
	docs "github.com/Trung78z/learn/serverGo/docs"
	"github.com/gin-gonic/gin"
	swaggerfiles "github.com/swaggo/files"
	ginSwagger "github.com/swaggo/gin-swagger"
)

// @BasePath /api/v1

// PingExample godoc
// @Summary ping example
// @Schemes
// @Description do ping
// @Tags example
// @Accept json
// @Produce json
// @Success 200 {json} Helloworld
// @Router /example/helloworld [get]

func Helloworld(g *gin.Context) {
	g.JSON(http.StatusOK, gin.H{"message": "Hello world"})
}
func init() {
	config.LoadEnv()
	config.InitDB()
}

func main() {
	r := gin.Default()
	docs.SwaggerInfo.BasePath = "/api/v1"
	v1 := r.Group("/api/v1/2")
	{
		v1.GET("/helloworld", Helloworld)

	}
	r.GET("/swagger/*any", ginSwagger.WrapHandler(swaggerfiles.Handler))
	r.Run(":" + os.Getenv("PORT"))

}
