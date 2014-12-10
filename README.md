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


Reliability using ZeroMQ
------------------------

Achieving full (100%) reliability is extremely difficult (if not impossible).
ZeroMQ offers a number of building blocks that can be used to offer good-enough
reliability for almost all cases (say 99.9%). One way to offer some robustness
in a very simple way is to resend the same message more than once. It might
sound silly at first but is actually quite useful. Take the weather service example
where the weather is continiously broacasted. A client can choose to take an average
over a period or simple the last reveived message. In the PLM case could parts and
BOMs be guaranteed to be published once every day (or every hours etc. if necessary)
in addition to when they actually change at the source.

Id addition, there are a number of techniques and patterns that offer reliability.
ZeroMQ recommends the Majordomo pattern, for broker-based reliability, and the
Freelance pattern, for brokerless reliability. See the
[ZeroMQ Guide](http://zguide.zeromq.org) for the details.


Notes
-----

NodeJS for the enterprise:

 * [StrongLoop](http://strongloop.com) provides enterprise NodeJS architecture
   and have a MQ wrapper (hosted and on-site)
 * [Microsoft Azure](http://azure.microsoft.com/en-us/develop/nodejs/) has several
  hosted solutions
 * A good summary of queues [queue.io](http://queues.io). There are several
   very capable open source alterantives like for instance
   [ZeroMQ](http://zeromq.org)
