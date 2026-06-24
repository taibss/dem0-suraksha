"use client";
import { useState, useEffect } from "react";
import { MapContainer, TileLayer, Circle, Tooltip } from "react-leaflet";
import "leaflet/dist/leaflet.css";

type Severity = "high" | "rising" | "watch";

const HOTSPOTS: { lat: number; lng: number; area: string; label: string; type: string; severity: Severity }[] = [
  { lat: 19.1136, lng: 72.8697, area: "Andheri / Jogeshwari", label: "Z1 · Andheri",   type: "UPI fraud · fake job rackets",   severity: "high"   },
  { lat: 19.2307, lng: 72.8567, area: "Borivali / Kandivali", label: "Z1 · Borivali",  type: "Digital arrest calls",           severity: "high"   },
  { lat: 19.2183, lng: 72.9781, area: "Thane",                label: "Z3 · Thane",     type: "Investment / trading traps",     severity: "rising" },
  { lat: 19.0596, lng: 72.8295, area: "Bandra / Khar",        label: "Z2 · Bandra",    type: "OTP & card phishing",            severity: "rising" },
  { lat: 19.1176, lng: 72.9060, area: "Powai / Vikhroli",     label: "Z3 · Powai",     type: "Work-from-home task scams",      severity: "watch"  },
  { lat: 19.0178, lng: 72.8478, area: "Dadar / Sion",         label: "Z2 · Dadar",     type: "Loan app harassment",            severity: "watch"  },
  { lat: 19.0771, lng: 73.0071, area: "Navi Mumbai / Vashi",  label: "Z4 · Vashi",     type: "Online shopping fraud",          severity: "watch"  },
  { lat: 18.9322, lng: 72.8264, area: "Fort / Colaba",        label: "Z4 · Colaba",    type: "Courier / customs scams",        severity: "watch"  },
];

const COLOR: Record<Severity, string> = { high: "#DC2626", rising: "#D97706", watch: "#64748B" };
const RADIUS: Record<Severity, number> = { high: 1800, rising: 1200, watch: 800 };

export default function MumbaiMap() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setMounted(true); }, []);
  if (!mounted) return null;

  return (
    <MapContainer
      center={[19.09, 72.89]}
      zoom={11}
      style={{ height: "100%", width: "100%" }}
      scrollWheelZoom={false}
      zoomControl={true}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; OpenStreetMap contributors'
      />

      {/* Hotspot markers */}
      {HOTSPOTS.map((h) => (
        <Circle
          key={h.area}
          center={[h.lat, h.lng]}
          radius={RADIUS[h.severity]}
          pathOptions={{
            color: COLOR[h.severity],
            fillColor: COLOR[h.severity],
            fillOpacity: 0.25,
            weight: 2,
          }}
        >
          <Tooltip direction="top" className={`custom-tooltip-${h.severity}`}>
            {h.label}
          </Tooltip>
        </Circle>
      ))}
    </MapContainer>
  );
}
