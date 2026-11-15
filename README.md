# IM3 / Design Lab — concept configurator

Prototipo React + Vite + TypeScript con Three.js / React Three Fiber / Drei e Zustand.
Il veicolo è una **mesh placeholder geometrica**, non un modello BMW ufficiale né una replica accurata.

## Avvio
```bash
npm install
npm run dev
```
Apri l'URL indicato da Vite. Build di produzione: `npm run build`, preview: `npm run preview`.

## Struttura
```
src/
  App.tsx
  main.tsx
  store.ts
  styles.css
  components/
    CarModel.tsx
    BlueprintLayer.tsx
    OrthographicViews.tsx
    ExplodedDetails.tsx
    UIControls.tsx
public/
  models/
```

## Inserire un GLTF/GLB autorizzato
1. Copia il file che hai diritto di usare in `public/models/bmw_im3.glb`.
2. In `src/components/CarModel.tsx`, cambia il return di `CarModel` da `<ProceduralCar/>` a `<GLTFCar/>`.
3. Verifica scala e orientamento: il placeholder assume lunghezza circa 4.3 unità, asse longitudinale Z e Y verticale. Se il GLTF è differente, correggi `scale`, `position` e rotazione nel componente `GLTFCar`.
4. Per applicare i colori al GLTF, traversa `gltf.scene` e sostituisci i materiali per nome/tag. Il componente GLTFCar qui è intenzionalmente un punto d'innesto minimale: non sovrascrive automaticamente i materiali del file.
5. `useGLTF.preload('/models/bmw_im3.glb')` può essere aggiunto per anticipare il caricamento. Suspense è già presente nella scena.

## Blueprint / layer
- La texture carta è generata con Canvas e griglia fine + griglia maggiore.
- `BlueprintLayer` crea edge lines per le mesh presenti, separandole dalla geometria shaded. È un overlay semplificato; per un blueprint di produzione si consiglia di esportare curve/linee CAD dedicate e quote SVG/HTML.
- `OrthographicViews` e `ExplodedDetails` sono overlay dimostrativi con label/parti illustrative, non viste ortografiche CAD vere. Per viste ortografiche complete, usare camere Orthographic dedicate in viewport secondari.
- `OrbitControls` supporta orbit, zoom e pan; DPR limitato a 1–1.5.

## Limiti / licenze
“2027 BMW iM3” è trattata come concept indipendente. Nessun asset BMW è incluso o collegato. Usa solo modelli con licenza adeguata.
