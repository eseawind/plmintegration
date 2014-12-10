var fs = require('fs');
var XmlStream = require('xml-stream');


//
// Parsing the file filePath, look for xmlElements and return a JSON structure
// ---------------------------------------------------------------------------


var p = function(filePath, xmlElements, cb) {

  var inStream = fs.createReadStream(filePath);
  var xml = new XmlStream(inStream);

  var elements = {};

  xmlElements.forEach(function(e) {

    elements[e] = [];

    xml.preserve(e, true);
    xml.on('endElement: '+e, function(element) {
      elements[e].push(element);
    });

    xml.on('end', function () {
      console.log('Found %d %s elements in %s.', elements[e].length, e, filePath);
      if (cb !== undefined) cb(elements);
    });

  });

  xml.on('error', function (err) {
    console.log('error: '+err);
  });

};


//
// Main
// ----

p('./examples/ESIResponse_AddedComponent.xml', ['Part']);
p('./examples/ESIResponse_InitialExport.xml', ['Part','BOMHeader']);
p('./examples/ESIResponse_RemovedComponent.xml', ['ChangedParts','ChangedBOMs', 'UnchangedParts', 'AddedBOMs']);
p('./examples/ESIResponse_UpdatedLink.xml', ['ChangedParts','ChangedBOMs', 'UnchangedParts', 'AddedBOMs']);
