<?php
/*
Copyright (c) 2013 Ian Neubert and others.

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated 
documentation files (the "Software"), to deal in the Software without restriction, including without limitation 
the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, 
and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions 
of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED 
TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL 
THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF 
CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS 
IN THE SOFTWARE.
*/

// don't kill the long running script
set_time_limit(0);

if (!defined('date.timezone')) {
    ini_set('date.timezone', 'America/Los_Angeles');
}

if (!defined('debug')) {
    define('debug', false);
}


if (!defined('mysqlDumpOptions')) {
    define('mysqlDumpOptions', '--quote-names --quick --add-drop-table --add-locks --allow-keywords --disable-keys --extended-insert --single-transaction --create-options --comments --net_buffer_length=16384');
}

//delete old backups
switch (modo) {
    case "daily":
        deleteDailyBackups();
        break;
    case "monthly":
        //deleteWeeklyBackups();
        break;
    default:
        deleteHourlyBackups();
        break;
}


//Setup variables
$mysql_backup_options = mysqlDumpOptions;

// Backup functions


function backupDB($hostname, $username, $password, $database, $prefix, $post_backup_query = '')
{
    //delete old backups
    $backup_file = modo . '/' . $database . '-' . date(tipofecha) . '.sql';
    $command = '"c:\Program Files (x86)\MySQL\MySQL Server 5.5\bin\mysqldump"' . " --opt -h $hostname -u $username -p$password $database  > $backup_file";
    // ejecución y salida de éxito o errores
    system($command, $output);
    //echo $output;
}


function deleteHourlyBackups()
{

    //delete hourly backups, 72 hours before now, except the midnight (00) backup
    $set_date = strtotime('-90 hours');
    if (schedule == "hourly") {
        for ($i = 0; $i <= 23; $i++) {
            $prefix = path('', database, $set_date, true) . str_pad((string)$i, 2, "0", STR_PAD_LEFT);
            if (debug == true) echo("Deleting hourly backup: " . $prefix . "\n");
            deletePrefix($prefix);
        }
    }
}

function deleteWeeklyBackups()
{

    //delete the backup from 36 weeks ago
    $set_date = strtotime('-36 weeks');
    $prefix = path('', '', $set_date, false);

    //only if it wasn't in January
    if ((int)date('n', $set_date) !== 1) {
        if (debug == true) echo "Deleting backup from 36 weeks ago: " . $prefix . "\n";

        //delete each key found
        deletePrefix($prefix);
    } else {
        if (debug == true) echo "Will NOT delete backup from 36 weeks ago, because that was the January week: " . $prefix . "\n";
    }

    //delete the backup from 16 weeks ago
    $set_date = strtotime('-16 weeks');
    $prefix = path('', '', $set_date, false);

    //only if it wasn't the 1st 7 days of the month
    if ((int)date('j', $set_date) > 7) {
        if (debug == true) echo "Deleting backup from 16 weeks ago: " . $prefix . "\n";

        deletePrefix($prefix);
    } else {
        if (debug == true) echo "Will NOT delete backup from 16 weeks ago, because that was the first week: " . $prefix . "\n";
    }
}

function deleteDailyBackups()
{

    //delete hourly backups, 72 hours before now, except the midnight (00) backup

    for ($i = -60; $i <= -30; $i++) {
        $set_date = strtotime("$i days");
        $prefix = path('', database, $set_date, false) ;
        if (debug == true) echo("Deleting daily backup: " . $prefix . "\n");
        deletePrefix($prefix);
    }



}

function deletePrefix($prefix)
{
    $directorio = modo . '/';
    $keys = scandir($directorio);
    //find files to delete
    echo $prefix . "<br>";
    foreach ($keys as $key => $meta) {
        if (debug == true) echo $meta . "<br>";
        // al realizar la busqueda en caso de encontrar el archivo para borrarlo

        if ($prefix . '.sql' === $directorio . $meta) {
            unlink($directorio . $meta);
        }
    }
}

function path($prefix, $name, $timestamp = null, $force_hourly = null)
{
    if (is_null($timestamp)) $timestamp = time();
    if (  modo == "hourly") {
        $date = date("Y-m-d-", $timestamp);
    } else {
        $date = date(tipofecha, $timestamp);
    }
    return modo . "/$name-" . $date;
}
?>
