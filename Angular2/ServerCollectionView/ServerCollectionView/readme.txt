ServerCollectionView
------------------------------------------------------------------------------
Shows how to implement a CollectionView class that retrieves data from a server.

The sample implements a simple data service and a ServerCollectionView class 
that runs on the client.

The data service supports paging, sorting, and filtering on the server.
The sorting and filtering are implemented using the System.Data.DataTable 
class on the server.

The data service also provides CRUD support via a REST API similar to 
the one defined by the OData protocol.

The ServerCollectionView exposes this data service as a CollectionView
that can be used with all Wijmo controls.

The ServerCollectionView class has a property called 'showDatesAsGmt' 
that deserves some extra comments:

JavaScript Date objects are based on a value that represents the number 
of milliseconds since 1/1/1970 GMT. This value is independent of time zone.

However, most methods in the Date class do take the time zone into account. 
They do this by adding a number of minutes to the date. This value depends 
on the machine and can be retrieved using the date's getTimezoneOffset() 
method. This can be confusing because the value returned by this method 
depends on the location and also on whether on daylight savings apply to the 
date in the current location.

This can lead to strange results when serializing dates as strings and 
de-serializing them in different time zones.

For example, assume you have serialized a date as "1948-12-08T00:00:00Z". 
This means Dec 8, 1948, in Greenwich Mean Time (GMT).

If you de-serialize this date by calling "new Date(s)", you will get back 
the same date. But depending on where you are, it may look different. 
For example:

<code>
    var dt = new Date("1948-12-08T00:00:00Z");
    console.log(dt.toString())
    "Tue Dec 07 1948 22:00:00 GMT-0200 (E. South America Daylight Time)"
</code>

Dec 8 at midnight in Greenwich is Dec 7 at 10pm in South America. There's 
a two-hour difference taking into account daylight savings time.The dates 
are stored correctly, but JavaScript will format them using local time. 
If you are in a time zone with a negative offset (West of Grennwich), all
dates formatted this way will look like the previous day (subtract the time
zone offset from midnight and you will get the previous day).

Also, values stored as pure dates (midnight-based) will now have a time part.

Summarizing, all JavaScript dates are based on a GMT offset value. But they 
are converted to appear like local dates which means they will look like 
different values depending on the time zone settings on your machine.

The showDatesAsGmt property causes the ServerCollectionView to convert dates 
read from the database so they look like GMT dates.

Specifically, setting this new property to true causes the ServerCollectionView 
to add the local time zone offset to dates being read from the database and to 
subtract it when writing. This way, when dates are formatted to the local time 
zone they look like the original GMT values.

For example, the employee list stored in the public OData service at 

'http://services.odata.org/V4/Northwind/Northwind.svc'

Looks like this when loaded on a machine in South America:

<code>
    Name        Birth Date             Hire Date
    Davolio     1948/12/07 22:00:00    1992/04/30 21:00:00
    Fuller      1952/02/18 21:00:00    1992/08/13 21:00:00
    Leverling   1963/08/29 21:00:00    1992/03/31 21:00:00
    Peacock     1937/09/18 21:00:00    1993/05/02 21:00:00
    Buchanan    1955/03/03 21:00:00    1993/10/16 21:00:00
    Suyama      1963/07/01 21:00:00    1993/10/16 21:00:00
    King        1960/05/28 21:00:00    1994/01/01 22:00:00
    Callahan    1958/01/08 22:00:00    1994/03/04 21:00:00
    Dodsworth   1966/01/26 22:00:00    1994/11/14 22:00:00
</code>

Notice how the dates also have time parts, and they are not all 
the same since some of the dates falls into a daylight savings 
period. If you try to filter on these dates by date alone (e.g.
look for '1948/12/07') you will not find anything, because the 
time part will be missing from the filter.

Loading the same data on a machine in the US or in Japan would 
show different date values.

If you set the showDatesAsGmt property to true, the data will 
look like this:

<code>
    Name        Birth Date             Hire Date
    Davolio     1948/12/08 00:00:00    1992/05/01 00:00:00
    Fuller      1952/02/19 00:00:00    1992/08/14 00:00:00
    Leverling   1963/08/30 00:00:00    1992/04/01 00:00:00
    Peacock     1937/09/19 00:00:00    1993/05/03 00:00:00
    Buchanan    1955/03/04 00:00:00    1993/10/17 00:00:00
    Suyama      1963/07/02 00:00:00    1993/10/17 00:00:00
    King        1960/05/29 00:00:00    1994/01/02 00:00:00
    Callahan    1958/01/09 00:00:00    1994/03/05 00:00:00
    Dodsworth   1966/01/27 00:00:00    1994/11/15 00:00:00
</code>

The dates are now displayed as GMT, regardless of location.
Presumably, these values are more meaningful. Nancy Davolio's 
birthday is on December 8, regardless of where you are.
