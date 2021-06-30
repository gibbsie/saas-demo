'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const uuidv4 = require('uuid/v4');

// Configure Environment
const configModule = require('../shared-modules/config-helper/config.js');
var configuration = configModule.configure(process.env.NODE_ENV);

// Configure Logging
const winston = require('winston');
winston.add(new winston.transports.Console({level: configuration.loglevel}));

// Include Custom Modules
const tokenManager = require('../shared-modules/token-manager/token-manager.js');
const DynamoDBHelper = require('../shared-modules/dynamodb-helper/dynamodb-helper.js');

// Instantiate application
var app = express();

// Configure middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(function(req, res, next) {
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, PATCH, DELETE");
	res.header("Access-Control-Allow-Headers", "Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
	next();
});

// Create a schema
var mediaSchema = {
	TableName: configuration.table.media,
	KeySchema: [
		{AttributeName: "media_id", KeyType: "HASH"}  //Partition key
	],
	AttributeDefinitions: [
		{AttributeName: "media_id", AttributeType: "S"}
	],
	ProvisionedThroughput: {
		ReadCapacityUnits: 5,
		WriteCapacityUnits: 5
	}
};

app.get('/media/health', function(req, res) {
	res.status(200).send({service: 'Media Manager', isAlive: true});
});

// Create REST entry points
app.get('/media/:id', function(req, res) {
	winston.debug('Fetching media: ' + req.params.id);
	// init params structure with request params
	var params = {
		media_id: req.params.id
	};
	tokenManager.getSystemCredentials(function(credentials) {
		// construct the helper object
		var dynamoHelper = new DynamoDBHelper(mediaSchema, credentials, configuration);
		dynamoHelper.getItem(params, credentials, function(err, media) {
			if (err) {
				winston.error('Error getting media: ' + err.message);
				res.status(400).send('{"Error": "Error getting media"}');
			} else {
				winston.debug('Media ' + req.params.id + ' retrieved');
				res.status(200).send(media);
			}
		});
	});
});

app.get('/media', function(req, res) {
	var searchParams = {
		TableName: mediaSchema.TableName
	};
	// construct the helper object
	tokenManager.getSystemCredentials(function(credentials) {
		var dynamoHelper = new DynamoDBHelper(mediaSchema, credentials, configuration);
		dynamoHelper.scan(searchParams, credentials, function(error, media) {
			if (error) {
				winston.error('Error retrieving media: ' + error.message);
				res.status(400).send('{"Error": "Error retrieving media"}');
			} else {
				winston.debug('Media successfully retrieved');
				res.status(200).send(media);
			}
		});
	});
});

app.post('/media', function(req, res) {
	var media = req.body;
	var guid = uuidv4();
	media.media_id = guid;
	winston.debug(JSON.stringify(media));
	// construct the helper object
	tokenManager.getSystemCredentials(function(credentials) {
		var dynamoHelper = new DynamoDBHelper(mediaSchema, credentials, configuration);
		dynamoHelper.putItem(media, credentials, function(err, media) {
			if (err) {
				winston.error('Error creating new media: ' + err.message);
				res.status(400).send('{"Error": "Error creating media"}');
			} else {
				winston.debug('Media ' + req.body.title + ' created');
				res.status(200).send({status: 'success'});
			}
		});
	});
});

app.put('/media', function(req, res) {
	winston.debug('Updating media: ' + req.body.media_id);
	// init the params from the request data
	var keyParams = {
		media_id: req.body.media_id
	};
	var mediaUpdateParams = {
		TableName: mediaSchema.TableName,
		Key: keyParams,
		UpdateExpression: "set " +
				"sku = :sku, " +
				"title = :title, " +
				"description = :description, " +
				"#condition = :condition, " +
				"conditionDescription = :conditionDescription, " +
				"numberInStock = :numberInStock, " +
				"unitCost = :unitCost",
		ExpressionAttributeNames: {
			'#condition': 'condition'
		},
		ExpressionAttributeValues: {
			":sku": req.body.sku,
			":title": req.body.title,
			":description": req.body.description,
			":condition": req.body.condition,
			":conditionDescription": req.body.conditionDescription,
			":numberInStock": req.body.numberInStock,
			":unitCost": req.body.unitCost
		},
		ReturnValues: "UPDATED_NEW"
	};
	// construct the helper object
	tokenManager.getSystemCredentials(function(credentials) {
		var dynamoHelper = new DynamoDBHelper(mediaSchema, credentials, configuration);
		dynamoHelper.updateItem(mediaUpdateParams, credentials, function(err, media) {
			if (err) {
				winston.error('Error updating media: ' + err.message);
				res.status(400).send('{"Error": "Error updating media"}');
			} else {
				winston.debug('Media ' + req.body.title + ' updated');
				res.status(200).send(media);
			}
		});
	});
});

app.delete('/media/:id', function(req, res) {
	winston.debug('Deleting media: ' + req.params.id);
	// init parameter structure
	var deleteMediaParams = {
		TableName: mediaSchema.TableName,
		Key: {
			media_id: req.params.id
		}
	};
	// construct the helper object
	tokenManager.getSystemCredentials(function(credentials) {
		var dynamoHelper = new DynamoDBHelper(mediaSchema, credentials, configuration);
		dynamoHelper.deleteItem(deleteMediaParams, credentials, function(err, media) {
			if (err) {
				winston.error('Error deleting media: ' + err.message);
				res.status(400).send('{"Error": "Error deleting media"}');
			} else {
				winston.debug('Media ' + req.params.id + ' deleted');
				res.status(200).send({status: 'success'});
			}
		});
	});
});

// Start the servers
app.listen(configuration.port.media);
console.log(configuration.name.media + ' service started on port ' + configuration.port.media);
