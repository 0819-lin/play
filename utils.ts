
import * as THREE from 'three';
import { TREE_CONFIG } from './constants';

export const generateChaosPosition = (radius: number): [number, number, number] => {
  const theta = Math.random() * Math.PI * 2;
  const phi = Math.acos(2 * Math.random() - 1);
  const r = Math.pow(Math.random(), 0.5) * radius;
  return [
    r * Math.sin(phi) * Math.cos(theta),
    r * Math.sin(phi) * Math.sin(theta),
    r * Math.cos(phi)
  ];
};

export const generateTreePosition = (height: number, maxRadius: number): [number, number, number] => {
  const y = Math.random() * height;
  const currentMaxRadius = (1 - y / height) * maxRadius;
  const angle = Math.random() * Math.PI * 2;
  const r = Math.pow(Math.random(), 0.5) * currentMaxRadius;
  return [
    r * Math.cos(angle),
    y - height / 2, // Center vertically
    r * Math.sin(angle)
  ];
};
