'use strict'

exports.success = (res, value) => {
  const result = {
    status: {
      code : 200,
      message : "success"
    },
    result: value
  }
  res.status(200).json({ arkanotes:result });
  res.end();
}

exports.inserted = (res, message) => {
  const result = {
    status: {
      code : 201,
      message : `data successfully ${message}`  
    }
  }
  res.status(201).json({ arkanotes:result });
  res.end();
}

exports.notFound = (res) => {
  const result = {
    status: {
      code : 404,
      message : "no entry found"
    }
  }
  res.status(200).json({ arkanotes:result });
  res.end();
}

exports.error = (res, err) => {
  const result = {
    status: {
      code : 500,
      message : err.message
    }
  }
  res.status(500).json({ arkanotes:result });
  res.end();
}