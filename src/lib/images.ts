/**
 * Real photographs from Pexels (free to use, no attribution required — see https://www.pexels.com/license/).
 * None are ARES photos: they are illustrative only, and the UI labels them that way.
 * To swap one, replace its `path` (the part after /photos/) with another Pexels photo.
 */
const base = 'https://images.pexels.com/photos/';

const PHOTOS = {
  wildfire: {
    path: '33621898/pexels-photo-33621898/free-photo-of-aerial-view-of-wildfire-spreading-in-savanna.jpeg',
    alt: 'Aerial view of a wildfire spreading across grassland',
  },
  grassfire: {
    path: '33621886/pexels-photo-33621886/free-photo-of-aerial-view-of-grassland-fire-in-south-africa.jpeg',
    alt: 'Aerial view of a grassland fire with smoke drifting across the landscape',
  },
  firefighters: {
    path: '8552692/pexels-photo-8552692.jpeg',
    alt: 'Firefighters working to control a wildfire in dry terrain',
  },
  firefightersNight: {
    path: '32852671/pexels-photo-32852671/free-photo-of-nighttime-firefighter-operation-with-spray-effect.jpeg',
    alt: 'Firefighter working at night at an incident scene',
  },
  drone: {
    path: '30382829/pexels-photo-30382829/free-photo-of-high-tech-drone-with-mounted-action-camera.jpeg',
    alt: 'Quadcopter drone with a mounted camera',
  },
  droneSky: {
    path: '19116670/pexels-photo-19116670/free-photo-of-floating-drone-in-the-air.jpeg',
    alt: 'A drone hovering in the air',
  },
  rescueRuins: {
    path: '15809172/pexels-photo-15809172/free-photo-of-a-rescuer-in-the-ruins.jpeg',
    alt: 'A rescuer searching through ruins after an earthquake',
  },
  rescueTeam: {
    path: '15808832/pexels-photo-15808832/free-photo-of-rescue-team-at-ruins.jpeg',
    alt: 'Rescue team working among collapsed buildings',
  },
  destroyed: {
    path: '15861729/pexels-photo-15861729/free-photo-of-firefighters-among-destroyed-buildings-after-earthquake.jpeg',
    alt: 'Responders among destroyed buildings after an earthquake',
  },
  simulation: {
    path: '34104792/pexels-photo-34104792/free-photo-of-emergency-rescue-simulation-with-first-responders.jpeg',
    alt: 'First responders taking part in an emergency rescue exercise',
  },
} as const;

export type PhotoKey = keyof typeof PHOTOS;

export function photo(key: PhotoKey, width = 1400) {
  const p = PHOTOS[key];
  return { src: `${base}${p.path}?auto=compress&cs=tinysrgb&w=${width}`, alt: p.alt };
}
