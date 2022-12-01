<?php

 $filename = "vSpline_packaged.zip";
$size = filesize($filename);

// http headers for zip downloads
header("Pragma: public");
header("Expires: 0");
header("Cache-Control: must-revalidate, post-check=0, pre-check=0");
header("Cache-Control: public");
header("Content-Description: File Transfer");
header("Content-type: application/octet-stream");
header("Content-Disposition: attachment; filename=\"".$filename."\"");
header("Content-Transfer-Encoding: binary");

header('Content-Length: '.$size);
header("Content-Range: 0-".($size-1)."/".$size);

ob_end_flush();
@readfile($filename);
?>
