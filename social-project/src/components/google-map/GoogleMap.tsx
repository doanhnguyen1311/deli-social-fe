import { useEffect, useRef } from "react";
import noMap from "@/components/images/invalidMap.png";
;
declare global {
  interface Window {
    google: any;
  }
}

interface GoogleMapProps {
  mapUrl: string;
}

const GoogleMap = ({ mapUrl }: GoogleMapProps) => {
  const mapRef = useRef<HTMLDivElement>(null);

  function getCoordinatesFromUrl(url: string) {
    const match = url.match(/@([-.\d]+),([-.\d]+)/);
    return match
      ? { lat: parseFloat(match[1]), lng: parseFloat(match[2]) }
      : null;
  }

  useEffect(() => {
    const initMap = () => {
      if (!window.google || !window.google.maps || !mapRef.current) return;

      const coords = getCoordinatesFromUrl(mapUrl);
      if (coords) {
        const map = new window.google.maps.Map(mapRef.current, {
          center: coords,
          zoom: 15,
        });

        new window.google.maps.Marker({
          position: coords,
          map: map,
        });
      }
    };

    if (!window.google) {
      const script = document.createElement("script");
      script.src = `https://maps.googleapis.com/maps/api/js?key=${import.meta.env.VITE_GOOGLE_API_KEY}&callback=initMap`;
      script.async = true;
      script.defer = true;
      script.onload = () => initMap();
      document.body.appendChild(script);
    } else {
      initMap();
    }
  }, [mapUrl]);

  return (
    <>
      {mapUrl?.length > 12 ? (
        <div
          ref={mapRef}
          style={{ width: "100%", height: "300px", borderRadius: "12px" }}
        />
      ) : (
        <div
          className="d-flex w-100 card align-items-center justify-content-center aling-self-center"
          style={{ height: "300px", backgroundColor: "white" }}
        >
          <img
            src={noMap}
            alt="no map"
            className="mw-100 mh-100 object-fit-cover rounded-12px"
          />
        </div>
      )}
    </>
  );
};

export default GoogleMap;
