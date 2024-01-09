import React from 'react'
import { useMapEvents } from 'react-leaflet'

type Props = {
	handleViewportChange: () => void
}
export const MapEvents: React.FC<Props> = ({ handleViewportChange }) => {
	useMapEvents({
    zoomend: handleViewportChange,
		moveend: handleViewportChange
  })
	return (
		<></>
	)
}
