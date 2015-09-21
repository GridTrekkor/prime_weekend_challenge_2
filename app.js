$(document).ready(function() {

	// get weather data for default locations that have preset data (i.e., locations)
	var Locations = ($(".HasData").length);
	var Location;
	var Element;

	var i = 0;
	while (i < Locations) {
		// get location to send to API based on DATA attrib of location index "i" -- .eq() gets the index of the specified element(s)
		Location = $(".HasData .Location").eq(i).data("query");
		Element = $(".HasData .Location").eq(i);
		GetData(Location, Element);
		i++;
	}

	// $("ul").on("click", function() {

	// 	  //console.log($(this).find(".Location").text());
	// 	  console.log($(this).find(".Location").data("query"));
	// 	  //var QueryArray.push()

	// 	  //var LocationIndex = 0; 

	// });

	$(".Container .EmptyUL").on("click", function() {
		Location = prompt("Enter query");
		console.log(Location);
		// GetData(Location, $(".EmptyUL"));
		$(".Container .EmptyUL").css("background-color", "#5bc0de");
		$(".Container .EmptyUL").removeClass("EmptyUL").addClass("HasData");
		Element = $(".Container .EmptyUL .Location");
		Element.append(GetData(Location, $(".HasData .Location").eq(i)));
		//i++;
		

	});

	function GetData(Location, Element) {
		$.ajax({
			url : "http://api.wunderground.com/api/a7942b382662121a/geolookup/conditions/forecast/astronomy/q/" + Location + ".json",
			dataType : "jsonp"
		}).done(function(Data){
			//populate city ULs here

			console.log(Data);

			//Element.text(Data['current_observation']['observation_location']['city']);
			var LocationName = Data['current_observation']['observation_location']['city'];
			Element.append("<div class='LocationName'>" + LocationName + "</div>");

			var Temperature = Data['current_observation']['temp_f'];
			Element.append("<div class='Temperature'>&nbsp;" + Temperature + "&deg;</div>");
			var Conditions = Data['current_observation']['weather'];

			Element.append("<div class='Conditions'>" + Conditions + "</div>");

			var DewPoint = Data['current_observation']['dewpoint_f'];
			var Humidity = Data['current_observation']['relative_humidity'];
			var WindDirection = Data['current_observation']['wind_dir'];
			var WindSpeed = Data['current_observation']['wind_mph'];
			var Pressure = Data['current_observation']['pressure_in'];
			var PressureTrend = Data['current_observation']['pressure_trend'];
			if (PressureTrend == "+") PressureTrend = "R";
			if (PressureTrend == "0") PressureTrend = "S";
			if (PressureTrend == "-") PressureTrend = "F";

			(function() {
				var Table = $("<table></table>");
				Element.append(Table);
				var TableHTML = "";
				TableHTML += "<tr style='height:34px;'>";
				TableHTML += "<td class='DataType'>Dew Point</td><td class='Data'>" + DewPoint + "&deg;</td>";
				TableHTML += "</tr>";
				TableHTML += "<tr style='height:34px;'>";
				TableHTML += "<td class='DataType'>Humidity</td><td class='Data'>" + Humidity + "</td>";
				TableHTML += "</tr>";
				TableHTML += "<tr style='height:34px;'>";
				TableHTML += "<td class='DataType'>Wind</td><td class='Data'>" + WindSpeed + " mph" /*+ WindDirection*/ + "</td>";
				TableHTML += "</tr>";	
				TableHTML += "<tr style='height:34px;'>";
				TableHTML += "<td class='DataType'>Pressure</td><td class='Data'>" + Pressure + " " + PressureTrend + "</td>";
				TableHTML += "</tr>";

				Table.html(TableHTML);

			})();
			
			var UpdatedTime = Data['current_observation']['observation_time_rfc822'];
			Element.append("<div class='UpdatedTime'>" + UpdatedTime + "</div>");

		});
	}

	$('.Container').slideUp( 0 ).delay( 200 ).fadeIn( 400 );

});