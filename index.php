<?php
require 'vendor/autoload.php';

$api = new SpotifyWebAPI\SpotifyWebAPI();
$track = $api->getTrack('3OtlhVRkLHpX1rUadM6QpQ');

echo '<b>Track: </b>' . $track->name . '<br />';
echo '<b>Artist: </b>' . $track->artists[0]->name . '<br>';
echo '<b>' . ucfirst($track->album->album_type) . ' Name: </b>' . $track->album->name . '<br>';
echo '<img src="' . $track->album->images[0]->url .'" />';

echo '<pre>';

print_r($track);

echo '</pre>';


?>