# 2100 Student Directory API Documentation

## Base URL

`http://localhost:8080`

## Endpoints

### 1. Get All Students

**URL**: `/students`

**Method**: `GET`

**Description**: Retrieves a list of all students.

**Response**:
- `200 OK`: A JSON array of student objects.
- `500 Internal Server Error`: If there is an error retrieving the data.

**Response Example**:
```json
[
  {
    "name": "Arun",
    "gender": "Male",
    "physics": 88,
    "maths": 87,
    "english": 78
  },
  {
    "name": "Rajesh",
    "gender": "Male",
    "physics": 96,
    "maths": 100,
    "english": 95
  },
  ...
]

### 2. Get a particula student

**URL**: `/students/:name`

**Method**: `GET`

**Description**: Retrieves information of the student whose name is given

**Response**:
- `200 OK`: A JSON array of student objects.
- `400 Student Not found Error`: If there is no such student in the directory

**Response Example**:
```json

{
    "name": "Arun",
    "gender": "Male",
    "physics": 88,
    "maths": 87,
    "english": 78
}

### 3. Get All the students' names

**URL**: `/student-names`

**Method**: `GET`

**Description**: Retrieves a list of all the student's names.

**Response**:
- `200 OK`: A JSON array of student objects.
- `500 Internal Server Error`: If there is an error retrieving the data.

**Response Example**:
```json
["Arun","Rajesh","Moorthy","Raja","Usha","Priya","Sundar","Kavitha","Dinesh","Hema","Gowri","Ram","Murugan","Jenifer"]





