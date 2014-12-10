var express = require('express')
var http = require('http')
var path = require('path')
var gumballMachine = require('./routes/gumballMachine');

var app = express();

app.set('port', process.env.PORT || process.env.OPENSHIFT_NODEJS_PORT || 3000)
app.set('ip_address', process.env.IP || process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1')
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/', gumballMachine.gumballMachinesList);
app.get('/machineDetails/:id', gumballMachine.machineDetails);
app.post('/machineDetails/:id', gumballMachine.updateMachine);
app.get('/gumballMachinesList', gumballMachine.gumballMachinesList);

http.createServer(app).listen(app.get('port'), app.get('ip_address'),function(){
  console.log('Express server listening on port ' + app.get('port'));
});
