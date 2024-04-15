const {v4} = require("uuid")
const AWS = require("aws-sdk")

const addTodo = async (event) => {
  const { todo } = JSON.parse(event.body);
  const createdAt = new Date();
  const id=v4();
  const dynamodb = new AWS.DynamoDB.DocumentClient()
  console.log("This is an id",id)

  const newTodo = {
    id,
    todo,
    createdAt,
    complete: false
  }
  
  dynamodb.put({
    TableName: "TodoTable",
    Item: newTodo
  })

  return {
    statusCode: 200,
    body: JSON.stringify(newTodo),
  };
};


module.exports ={
  handler: addTodo
}