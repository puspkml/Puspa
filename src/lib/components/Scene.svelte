<script lang="ts">
  import { T } from '@threlte/core';
  import { OrbitControls, Environment } from '@threlte/extras';
  import { useGLTF } from '@threlte/extras';

  // To load a model directly with three.js loader
  import { onMount } from 'svelte';

  let model;

  onMount(async () => {
    try {
      // Reference the model from the static/public folder
      const gltf = await useGLTF('/models/myModel.glb');
      model = gltf.scene;
    } catch (error) {
      console.error('Error loading model:', error);
    }
  });
</script>

<T.PerspectiveCamera position={[10, 10, 10]} fov={75} makeDefault />
<OrbitControls autoRotate enableDamping />
<Environment preset="lobby" />

{#if model}
  <!-- Use the T.Primitive component to render the loaded Three.js object -->
  <T.Primitive object={model} scale={1} />
{:else}
  <T.Mesh>
    <T.BoxGeometry />
    <T.MeshStandardMaterial color="hotpink" />
  </T.Mesh>
{/if}
