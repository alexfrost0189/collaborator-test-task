import React from "react";
import { Flight } from "../../types";
import {
  formatDuration,
  formatTime,
  getDurationMinutes,
  formatPrice,
  formatStops,
} from "../../utils";
import "./FlightCard.scss";

type FlightCardProps = Flight;

export default function FlightCard({ price, airline, inbound, outbound }: FlightCardProps) {
  const outboundDuration = getDurationMinutes(
    outbound.departureTimestamp,
    outbound.arrivalTimestamp,
  );
  const inboundDuration = getDurationMinutes(inbound.departureTimestamp, inbound.arrivalTimestamp);
  const outboundStops = outbound.stopCities.length;
  const inboundStops = inbound.stopCities.length;

  return (
    <div className="flight-card">
      <div className="flight-card__header">
        <div className="flight-card__price">{formatPrice(price.amount, price.currency)}</div>
        <img
          className="flight-card__logo"
          src={`${process.env.PUBLIC_URL}${airline.logo}`}
          alt={airline.name}
        />
      </div>
      <div className="flight-card__info">
        <div className="flight-card__info-set">
          <div className="flight-card__info-item">
            <div className="flight-card__info-label">
              {outbound.from} - {outbound.to}
            </div>
            <div className="flight-card__info-value">
              {formatTime(outbound.departureTimestamp)} - {formatTime(outbound.arrivalTimestamp)}
            </div>
          </div>
          <div className="flight-card__info-item">
            <div className="flight-card__info-label">В ДОРОЗІ</div>
            <div className="flight-card__info-value">{formatDuration(outboundDuration)}</div>
          </div>
          <div className="flight-card__info-item">
            <div className="flight-card__info-label">{formatStops(outboundStops)}</div>
            {outboundStops > 0 ? (
              <div className="flight-card__info-value">{outbound.stopCities.join(", ")}</div>
            ) : null}
          </div>
        </div>
        <div className="flight-card__info-set">
          <div className="flight-card__info-item">
            <div className="flight-card__info-label">
              {inbound.from} - {inbound.to}
            </div>
            <div className="flight-card__info-value">
              {formatTime(inbound.departureTimestamp)} - {formatTime(inbound.arrivalTimestamp)}
            </div>
          </div>
          <div className="flight-card__info-item">
            <div className="flight-card__info-label">В ДОРОЗІ</div>
            <div className="flight-card__info-value">{formatDuration(inboundDuration)}</div>
          </div>
          <div className="flight-card__info-item">
            <div className="flight-card__info-label">{formatStops(inboundStops)}</div>
            {inboundStops > 0 ? (
              <div className="flight-card__info-value">{inbound.stopCities.join(", ")}</div>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
}
