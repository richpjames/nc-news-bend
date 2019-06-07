- cascade > used in migration - field that refernces foreign key, chain on .onDelete('CASCADE')
- destructure an array .then(thingToDeconstruct => [thingToDeconstruct])
- POST err 
  ('POST - status: 400 when posting without required fields', () => {
    return request(app)
    .post('path')
    .send
    .expect(400).then(({body}) => {
      expect(body.msg).to.eql('Missing house_name')
    })
  })

- ('POST - status: 400 when posting without required fields', () => {
    return request(app)
    .post('path')
    .send{string instead of a number}
    .expect(400).then(({body}) => {
      expect(body.msg).to.eql('Invalid input')
    })
  })
  //handleSqlErrors
  if(err.code === "23502" || err.code === "22P02") "<< array" res.status(400).send({msg: err.message.split(" - ")})
  else res.status(400)