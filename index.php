<html>
<head>
<style type="text/css">
	.full-details {
		position: absolute;
		background: rgba(0,0,0,0.1);
		height: 500px;
		overflow-y: scroll;
		width: auto;
		right: 0;
		padding: 10px;
		color: rgb(0,0,0);
	}

	.more{
		position: absolute;
		top: 20px;
		right: 20px;
	}

	.button-more {
		border: 1px solid rgba(220,150,50,1);
		border-radius: 5px;
		padding: 10px;
		background: rgb(223, 117, 20);
		color: rgb(255,255,255);
	}

	ul {list-style: none;}
	ul.more li ul li {display: none;}
	ul.more li:hover ul li {display: block;}
</style>
</head>
<body>


<?php
require 'vendor/autoload.php';

$api = new SpotifyWebAPI\SpotifyWebAPI();
$track = $api->getTrack('3OtlhVRkLHpX1rUadM6QpQ');

echo '<b>Track: </b>' . $track->name . '<br />';
echo '<b>Artist: </b>' . $track->artists[0]->name . '<br>';
echo '<b>' . ucfirst($track->album->album_type) . ' Name: </b>' . $track->album->name . '<br>';
echo '<img src="' . $track->album->images[0]->url .'" />';

?>

<ul class="debug more">
	<li class="button-more">Debug
		<ul>
			<li class="full-details">
				<?php
					echo '<pre>';
					print_r($track);
					echo '</pre>';
				?>
			</li>
		</ul>
	</li>
</ul>


</body>
</html>