PLM integration using NodeJS
============================

This repo investigates an approach for integrating PLM systems with ERP systems
using open source technology like NodeJS and ZeroMQ.

I'm using the package `xml-stream` to parse XML files with PLM data.

Just do `npm test` to parse the examples.

See [the github page](https://github.com/assistunion/xml-stream) for information
about the XML parser.


Integration architecture
------------------------

A common approach is that the PDM tools produce the XML in files that are
distributed one way or another.

Let's build a simple integration solution with this approach:
1. Take the XML files and parse them into JSON messages
2. Produce a format that clients understand. I'll just use a JSON format that
is closer to a typical ERP system
3. Put the JSON messages on a message queue
4. The ERP system (or an adapter sitting close to it) reads the message queue
and forwards the messages to it using whatever API it prefers.

Let's use NodeJS for both the middleware and the adapter that sits on the
ERP system. Let's also use ZeroMQ to send the messages using a simple
request/reply approach.

Next step could be to use a publish/subscribe pattern. A even better approach
is probably that the ERP system publish the changes performed **after** the update.
This way are only changes accepted by the ERP system published to other systems.


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
