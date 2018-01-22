OlapServerIntro (Angular 2)
------------------------------------------------------------------------------
Shows how to get started with the controls in the wijmo.olap module in server mode.

The server-mode option is used by setting the PivotEngine's itemsSource property 
to a data-service URL. Once configured to use the server-side, all OLAP work will 
be off-loaded to the service. 

The data service is based on our .NET-based WebAPI product. This product creates web 
services for several different products such as OLAP and Report/Document Viewers. 
Working on the client-side has limits to performance with large datasets, so if you 
have a huge amount of data, you will want to use the server-side option.

The WebAPI data services allow you to analyze custom data sources as well as 
Microsoft Analysis OLAP cubes.

You can find out more about our WebAPI product here:

http://www.componentone.com/Studio/Utilities/WebAPI 

First, you will need to install our packages via an exe or NuGet. Follow the 
instructions here:

http://helpcentral.componentone.com/nethelp/C1WebAPI/Installation.html

The WebAPI service is easy to install and configure on a Windows machine. Here are 
instructions you can follow along to set up a data service:

http://helpcentral.componentone.com/nethelp/C1WebAPI/APIDataEngine.html 

Once configured, you can set the itemsSource property of your PivotPanel or PivotEngine
to the URL of your installed WebAPI service. You can see code here that demonstrates 
setting the itemsSource property. Take a look at scripts/app.js for an example:

http://demos.wijmo.com/5/SampleExplorer/SampleExplorer/Sample/OlapServerIntro/PureJS/Code 

One of the nice things about Wijmo Olap is that it works the same whether the
processing is done on the client or on the server. You can use the same controls,
with the same object models.

However, there are some limitations depending on the type of data server you choose.
For example, when showing data for Olap cubes, most field settings are defined by 
the cube itself and cannot be modified in the client. The links above contain more
details.

System requirements
====================
Please refer to the description in the readme.txt file of the Wijmo Explorer for Angular 2 sample.