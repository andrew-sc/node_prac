var personArray = [
    {"name": "John Doe", "age": 20},
    {"name": "Jane Doe", "age": 19},
];

for(i=0; i<personArray.length; i++){
    let name = 0;
    let age = 0;

    name = personArray[i]['name'];
    age = personArray[i]['age'];
    
    console.log("His/Her name is ", name,". He/She is", age, "years old." )
}

for(let person in personArray){
    let name = personArray[person]['name'];
    let age = personArray[person]['age'];

    console.log("His/Her name is ", name,". He/She is", age, "years old." )
}

for(let person of personArray){
    let name = person['name'];
    let age = person['age'];

    console.log("His/Her name is ", name,". He/She is", age, "years old." )
}

personArray.forEach(person => {
    let name = person["name"];
    let age =  person["age"];
    console.log("His/Her name is ", name,". He/She is", age, "years old." )
})