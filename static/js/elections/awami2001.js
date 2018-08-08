var awami2001legend = L.control({position: 'bottomright'});
var awami2001info = L.control({position: 'bottomright'});

//////////////////////////////////////////////
function awami2001style(feature) {
  return {
    fillColor: getColorAwami2001(feature.properties.awamiPercentage),
    weight: 0.5,
    opacity: 1,
    color: '#FFFFFF',
    dashArray: '0',
    fillOpacity: 0.6
  }
}

function getColorAwami2001(d) {
  return d > 90 ? '#00441b' :
         d > 80 ? '#006d2c' :
         d > 70 ? '#238b45' :
         d > 60 ? '#41ae76' :
         d > 50 ? '#66c2a4' :
         d > 40 ? '#99d8c9' :
         d > 30 ? '#ccece6' :
         d > 20 ? '#e5f5f9' :
         d > 10 ? '#f7fcfd' :
         d > 0 ?  '#fdfffc' :
                  'lightgray' ;
    }

function highlightFeature(e) {
    var layer = e.target;
    layer.setStyle({
      weight: 2,
      color: '#FFFFFF',
      dashArray: '',
      fillOpacity: 0.7
    });
    if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
         layer.bringToFront();
     }
     awami2001info.update(layer.feature.properties);
  }

function resetHighlight(e) {
      awami2001geojson.resetStyle(e.target);
      awami2001info.update();
  }

function awami2001EachFeature(feature, layer) {
      layer.on({
          mouseover: highlightFeature,
          mouseout: resetHighlight,
          click: zoomToFeature
      });
    }

awami2001info.onAdd = function(map) {
    this._div = L.DomUtil.create('div', 'info');
    this.update();
    return this._div;
  };

awami2001info.update = function(props) {
  this._div.innerHTML = (props ? '<h5>' + props.constituency + '</h5>'
  + '<h5>' + totalVotes + ': ' + props.validVotes + '</h5>'
  + '<h5>' + recVotes + ': ' + props.awami + '</h5>'
  + '<h5>' + pctVote + ': ' + props.awamiPercentage + '%</h5>'
  + '<h5>' + winner + ': ' + props.winner + '</h5>'
  + '<h5>' + runnerUp + ': ' + props.runnerUp + '</h5>'
  + '' : '');
  };

//infoPD.addTo(map);

function zoomToFeature(e) {
    map.fitBounds(e.target.getBounds());
  }

  awami2001legend.onAdd = function(map) {
          this._div = L.DomUtil.create('div', 'info legend'),
          grades = [0, 10, 20, 30, 40, 50, 60, 70, 80, 90],
          labels = ['<h5>' + al + ' ' + pctVote + '</h5>'];
          this.update();
          return this._div;
  };

    awami2001legend.update = function(e) {
      for (var i = 0; i < grades.length; i++) {
        //this._div.innerHTML +=
        labels.push(
          '<i style="background: ' + getColorAwami2001(grades[i] + 1) + '"></i> '
          + grades[i] + (grades[i + 1] ? '&ndash;' + grades[i + 1]
          + '%<br>' : '%+'));
        }
      this._div.innerHTML = labels.join('');
      return this._div;
    };

  //PD
var awami2001geojson = L.geoJson(awami2001, {
      style: awami2001style,
      onEachFeature: awami2001EachFeature
  });
//END PD /////////////////////////////////////
