function mock(app) {
  app.get('/user',function(req, res){
    res.json({id:1, name:'test'})
  })
}
module.exports = mock