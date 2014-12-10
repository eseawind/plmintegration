PLM integration using NodeJS
============================

I'm using the package `xml-stream` to parse XML files with PLM data.

Just do `npm test` to parse the examples.

See [the github page](https://github.com/assistunion/xml-stream) for information
about the XML parser.


Notes
-----

Integration can be done by just using some API on the receiving side to quickly
build one-to-one integrations. A more scalable approach is to post the parts,
BOMs etc. to some queue. Some alternatives:

 * [StrongLoop](http://strongloop.com) provides enterprise NodeJS architecture
   and have a MQ wrapper (hosted and on-site)
 * [Microsoft Azure](http://azure.microsoft.com/en-us/develop/nodejs/) has several
  hosted solutions
 * A good summary of queues [queue.io](http://queues.io). There are several
   very capable open source alterantives like for instance
   [ZeroMQ](http://zeromq.org)
