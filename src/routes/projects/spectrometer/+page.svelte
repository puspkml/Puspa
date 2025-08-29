<script lang="ts">
  import { onMount } from 'svelte';
</script>

<style>
  .report-container {
    max-width: 900px;
    margin: auto;
    padding: 2rem;
    font-family: "Georgia", serif;
    line-height: 1.6;
  }

  h1, h2, h3 {
    margin-top: 2rem;
    margin-bottom: 1rem;
  }

  img {
    max-width: 100%;
    margin: 1rem 0;
  }

  ul, ol {
    margin-left: 2rem;
  }

  .abstract {
    font-style: italic;
    background-color: #f9f9f9;
    padding: 1rem;
    border-left: 4px solid #555;
    margin-bottom: 2rem;
  }

  a {
    color: #1e90ff;
  }

  hr {
    border: none;
    height: 2px;
    background-color: #555;
    margin: 2rem 0;
  }

  .image-row {
    display: flex;
    gap: 20px;          /* spacing between images */
    align-items: flex-start;
  }
  .image-row img {
    width: 300px;       /* adjust size */
    height: auto;
    border: 1px solid #ccc; /* optional styling */
    border-radius: 8px;     /* optional rounded corners */
  }
  .image-row p {
    text-align: center; /* captions under images */
    max-width: 300px;
  }

  .gallery {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
    gap: 20px;
    margin-top: 20px;
    text-align: center;
  }

  .gallery img {
    width: 100%;
    max-height: 220px; /* you can adjust this for scaling */
    object-fit: contain; /* keeps aspect ratio */
    border: 1px solid #ccc;
    border-radius: 8px;
  }

  .gallery p {
    margin-top: 6px;
    font-size: 14px;
    font-style: italic;
  }

</style>

<div class="report-container">

  <strong><h1>Design and Construction of a 3D Printed Smartphone-Based Spectrometer with Photonic Crystal Integration</h1></strong>

  <hr />

  <div class="abstract">This project presents the development of a compact, low-cost, and efficient spectrometer built using 3D-printed components and a smartphone camera as a sensor. The spectrometer incorporates space for elements such as photonic crystals and Bloch surface waves (BSW) to enable advanced spectral analysis. A modular adapter system allows flexibility to analyze both reference and sample spectra. The work elaborates on the conceptual basis, construction process, and analytical capability, providing an accessible platform for optical diagnostics and educational applications.rporates space for elements such as photonic crystals and Bloch surface waves (BSW) to allow advanced spectral analysis. A modular adapter system enables flexibility to analyze both reference and sample spectra. This report elaborates on the conceptual basis, construction process, and analytical capability, providing an accessible platform for optical diagnostics and educational tools.
  </div>

  <strong><h2>Introduction</h2></strong>
  <p>
  A spectrometer is a scientific instrument that helps us understand the composition of light. At its core, it breaks light into its component wavelengths—just like a prism creating a rainbow—and lets us analyze the intensity of each color. Why is that important? Because different materials absorb, reflect, or emit light in very specific ways. By studying these light patterns, we can identify what a substance is made of or how it behaves under certain conditions.

Spectrometers are used in a wide range of fields—physics, chemistry, biology, astronomy, environmental science, and even food quality testing. For example, astronomers use them to figure out what stars are made of, and biologists use them to measure the concentration of molecules in a sample.

But here’s the catch: professional spectrometers are expensive. Their high precision and durability come with a price tag that can be far out of reach for small labs, students, DIY hobbyists, or researchers in developing regions. That’s where the idea of building your own low-cost spectrometer becomes incredibly valuable.
</p>

  <strong><h2>Why Build a Low-Cost Spectrometer?</h2></strong>
  <p>Imagine having a powerful tool for scientific analysis that costs less than a meal at a restaurant. That is exactly the promise of a do-it-yourself (DIY) spectrometer using a DVD as a diffraction grating and a smartphone as the detector.

This approach is effective for several reasons:
</p>

  <ul>
    <li><strong>DVDs are already diffraction gratings:</strong>  A standard DVD contains thousands of closely spaced grooves that can diffract light into its spectral components. This optical behavior mimics the function of the costly diffraction gratings used in professional-grade spectrometers.
</li>
    <li><strong>Smartphones have excellent cameras:</strong> Modern smartphones are equipped with high-resolution image sensors capable of detecting the intensity of different wavelengths of light. This makes them surprisingly useful for recording and analyzing spectral data.
</li>
    <li><strong>Accessible and affordable:</strong> The required materials—such as a DVD, a cardboard box, black tape, a razor blade for creating a slit, and a smartphone—are widely available and inexpensive. This makes the design highly accessible for students, educators, researchers in low-resource settings, and DIY science enthusiasts.
</li>
    <li><strong>Educational value:</strong>Constructing a spectrometer from basic components provides a hands-on opportunity to learn about optics, light behavior, data acquisition, and basic engineering principles. The learning process itself adds value beyond the functionality of the device.
</li>
    <li><strong>Customization and experimentation:</strong>Unlike commercial instruments, a DIY spectrometer can be easily modified. Users can tailor the setup to specific applications, such as analyzing different light sources, measuring absorbance in liquids, monitoring plant pigments, or detecting contaminants in water samples.
</li>
  </ul>

  <strong><h2>Apparatus and Construction</h2></strong>

  <h3>Light Source and Optical Path</h3>

  <p>A white LED was employed as the primary light source for the spectrometer. The emitted light was initially collimated using a plano-convex lens with a focal length of 30~mm. The collimated beam passed through an aperture and was then reflected by a plane mirror towards a precision-machined slit of width 0.2~mm. The light emerging from the slit was further collimated using a second lens with a focal length of 20~mm and directed towards the diffraction grating. 

It is noteworthy that, for low-cost and customizable applications, these lenses can also be fabricated using polydimethylsiloxane (PDMS), a transparent elastomeric material that allows for easy molding of optical elements with good transmission in the visible range.
</p>

  <h3>Diffraction Grating and Detection</h3>
  <p>The diffraction grating was obtained from the reflective layer of a standard DVD, which contains approximately 1350 lines per millimeter. The grating was positioned and tilted precisely to achieve optimal diffraction of the incoming collimated beam. The resulting spectrum was captured using a smartphone camera mounted on a fixed 3D-printed holder, ensuring stability and alignment.

To enhance sensitivity and improve light collection at the camera sensor, an additional converging lens of suitable focal length and aperture can be placed directly in front of the smartphone camera. This optional component increases the intensity of the captured spectral features without compromising resolution.
s</p>

  <h3>Modular Sample Holder and Adaptability</h3>
  <p>The spectrometer features a modular sample interface that supports interchangeable adapters, providing flexibility for different modes of measurement. Two primary adapters were designed: one housing a plane mirror and the other holding a cuvette for sample analysis.

The mirror adapter is used for calibration and reference measurements by reflecting collimated white light directly into the grating. The cuvette holder, on the other hand, is intended for sample-based analysis, including liquid absorbance studies and advanced photonic measurements. Both adapters can be swapped without disturbing the optical alignment of the system, offering high repeatability and ease of use.
</p>

  <h3>Photonic Crystal Integration</h3>
  <p>For enhanced sensitivity and advanced optical interaction studies, a photonic crystal was incorporated into the spectrometer design. The photonic crystals were fabricated using a dip-coating technique to form ordered nanostructures on a transparent substrate. This coated surface was then integrated into the cuvette, serving as one of its walls.

A small prism was mounted on top of the photonic crystal to facilitate the excitation of Bloch surface waves, which are confined electromagnetic modes that propagate along the surface of the crystal. This configuration enables highly sensitive detection based on refractive index changes at the surface, making it particularly suitable for biosensing and molecular diagnostics.

</p>

  <img src="/projects/spectrometer/IMG-20250619-WA0009.jpg" alt="3D printed spectrometer top view" />
  <p><em>Figure 1: 3D printed spectrometer top view.</em></p>

  <img src="/projects/spectrometer/image.png" alt="Schematic of the Spectrometer" />
  <p><em>Figure 2: Schematic of the Spectrometer.</em></p>

  <strong><h2>Key Concepts</h2></strong>
  <h3>Photonic Crystals</h3>
  <p>Photonic crystals are optical materials with periodic dielectric structures that affect the motion of photons. They create photonic bandgaps—frequency ranges where light propagation is prohibited. These crystals are used to manipulate light in innovative ways, including waveguiding and filtering.
</p>

  <h3>Bloch Surface Waves (BSW)</h3>
  <p>BSWs are surface-confined electromagnetic waves that propagate along the interface of a photonic crystal and an external medium. Unlike surface plasmon resonance, BSWs work in dielectric structures and can provide high sensitivity and low losses, which are advantageous in sensing applications.

</p>

  <h2>Soft Lithography and PDMS Use</h2>
  <p>The diffraction grating from the DVD can be transferred onto a glass substrate using soft lithography involving PDMS (Polydimethylsiloxane). PDMS can also be used to fabricate optical lenses by molding against curved surfaces. This enhances customization in DIY optical components.


</p>

  <strong><h2>Online Spectral Analysis Tool</h2></strong>
  <p>We developed a web-based tool for spectrum analysis that allows:</p>
  <ul>
    <li>Uploading or capturing spectra using a smartphone.</li>
    <li>Cropping and isolating the region of interest.</li>
    <li>RGB-based wavelength calibration.</li>
    <li>Intensity vs wavelength plotting.</li>
    <li>Exporting plots and data as downloadable CSV files.</li>
  </ul>
  <p>
    This tool can be accessed at: <a href="https://saispectrum.streamlit.app/" target="_blank">Sai Spectrum Web App</a>
  </p>

  <strong><h2>Operating Procedure of the Spectrometer</h2></strong>
  <ol>
    <li><strong>Power On the Light Source:</strong> Begin by turning on the white light source that will be used for spectral analysis.
</li>
    <li><strong>Mount the Smartphone:</strong> Securely mount the smartphone in its designated position such that its camera aligns with the internal optical pathway of the spectrometer.
</li>
    <li><strong>Access the Web Application:</strong>Open the web-based application developed for spectrum acquisition and analysis using the smartphone browser.
</li>
    <li><strong>View the Direct Reflection Spectrum:</strong> Use the plane mirror adapter to reflect the incoming white light, enabling the direct capture of the spectrum by the smartphone camera.
</li>
    <li><strong>Calibrate the Spectrum:</strong> Identify the spectral peaks corresponding to the blue and red regions. Assign a wavelength of 450~nm to the peak in the blue region and 625~nm to the peak in the red region. This establishes a reference for accurate wavelength calibration.
</li>
    <li><strong>Replace with Cuvette Adapter:</strong> After calibration is complete, remove the plane mirror adapter and insert the cuvette adapter to enable absorbance measurements through the sample.
</li>
    <li><strong>Acquire Calibrated Spectrum:</strong> Observe the spectrum again. The web application will now display a calibrated graph based on the earlier wavelength calibration.
</li>
    <li><strong>Download Data:</strong> The spectrum data points can be downloaded in CSV format. In addition, the plotted spectrum can be saved as an image file. The application also allows for interactive exploration of the plotted data.
</li>
  </ol>

  <strong><h2>Results and Discussion</h2></strong>
  <p>The spectrometer was able to resolve spectral components of the white LED effectively. After calibration, the intensity vs wavelength plots showed distinguishable peaks consistent with expected LED emission profiles. When a sample was placed in the path using the cuvette, absorption dips corresponding to material properties were observed.

The modular design allowed seamless swapping between mirror and cuvette adapters, demonstrating potential for rapid testing. Integration with photonic crystals further enabled surface-level interaction detection.
.</p>

  <div class="image-row">
    <div>
      <img src="/projects/spectrometer/WhatsApp Image 2025-06-28 at 16.19.37_cb283bf0.jpg" alt="Spectrum using existing app">
      <p><em>Figure 3: Spectrum analysed using the already available application.</em></p>
    </div>
    <div>
      <img src="/projects/spectrometer/WhatsApp Image 2025-06-28 at 16.18.20_47934bc1.jpg" alt="Spectrum using developed app">
      <p><em>Figure 4: Spectrum analysed using the application developed in this project.</em></p>
    </div>
  </div>
  <strong><h2>Conclusion</h2></strong>
  <p>This project successfully illustrates the potential of building a low-cost, portable, and customizable spectrometer by integrating 3D-printed components with smartphone-based sensing. By combining fundamental concepts of optics with practical design and digital tools, we have created a device that not only serves educational purposes but also holds promise for basic analytical applications.

The simplicity and accessibility of this setup make it especially valuable for learning environments and resource-constrained settings, where traditional spectrometers may not be readily available. At the same time, its modular design opens the door for a wide range of enhancements.

One particularly exciting direction for future development is the incorporation of a photonic crystal. Integrating such a component could significantly improve the spectral selectivity and sensitivity of the device, enabling more precise analysis of reflected or transmitted light. This would elevate the spectrometer’s capabilities, especially in applications involving surface-level sensing or optical filtering.

Further improvements could include refining the optical alignment, enhancing spectral resolution, miniaturizing the overall footprint, and introducing machine learning algorithms for real-time spectrum classification and interpretation.

In summary, this project demonstrates that meaningful scientific tools can be made both affordable and adaptable, encouraging deeper exploration, innovation, and learning in the field of optics.
  </p>
  <strong><h2>Acknowledgement</h2></strong>
  <p>Sincere gratitude is extended to all those who provided support and guidance throughout the course of this work.

Foremost appreciation is due to Dr. Shiva Kiran Bhakta, Teacher-in-Charge, for invaluable guidance, constant encouragement, and insightful suggestions that shaped the direction and quality of the work.

Special acknowledgement is given to Mr. Somnath Pandit, Research Scholar, for consistent support, patience, and constructive feedback at every stage of the project.

Thanks are also due to the research scholars in the lab for fostering a collaborative and intellectually stimulating environment. Their assistance, technical insights, and camaraderie contributed greatly to the smooth progress of the work.

Gratitude is also expressed to the Department of Physics, Indian Institute of Technology (IIT) Kharagpur) for providing the infrastructure, academic resources, and conducive environment necessary for the research. Continued collaboration with IIT Kharagpur is anticipated in future endeavors.</p>


<!-- Image Gallery at the End -->
<strong><h2 style="text-align:center; margin-top:40px;">Spectrometer Components</h2></strong>

<div class="gallery">
  <div>
    <img src="/projects/spectrometer/lens_holder.jpg" alt="Lens holder" />
    <p><em>Lens holder</em></p>
  </div>

  <div>
    <img src="/projects/spectrometer/cuvette_holder.jpg" alt="Cuvette holder" />
    <p><em>Cuvette holder</em></p>
  </div>

  <div>
    <img src="/projects/spectrometer/mirror_holder.jpg" alt="Mirror holder" />
    <p><em>Mirror holder</em></p>
  </div>

  <div>
    <img src="/projects/spectrometer/apertures.jpg" alt="Apertures" />
    <p><em>Apertures</em></p>
  </div>

  <div>
    <img src="/projects/spectrometer/light_source.jpg" alt="Light source area" />
    <p><em>Light source area</em></p>
  </div>

  <div>
    <img src="/projects/spectrometer/phone_holder.jpg" alt="Phone holder" />
    <p><em>Phone holder</em></p>
  </div>

  <div>
    <img src="/projects/spectrometer/rechargeable_battery.jpg" alt="Rechargeable battery" />
    <p><em>Rechargeable battery</em></p>
  </div>
</div>


  <strong><h2>References</h2></strong>
  <ol>
    <li>J. D. Joannopoulos et al., <em>Photonic Crystals: Semiconductors of Light</em>. <a href="https://optoelectronics.eecs.berkeley.edu/eliy_SCIAM.pdf" target="_blank">Link</a></li>
    <li>F. Giorgis et al., "Experimental determination of the sensitivity of Bloch Surface Waves based sensors," <em>Optics Express</em>, vol. 18, no. 8, 2010, <a href="https://doi.org/10.1364/OE.18.008087" target="_blank">DOI</a></li>
    <li>R. V. Nair and R. Vijaya, "Photonic crystal sensors: An overview," <em>Progress in Quantum Electronics</em>, vol. 34, no. 3, 2010, <a href="https://doi.org/10.1016/j.pquantelec.2010.01.001" target="_blank">DOI</a></li>
    <li>Hackaday, "A Low-Cost Spectrometer Uses Discrete LEDs And Math," <a href="https://hackaday.com/2024/12/28/a-low-cost-spectrometer-uses-discrete-leds-and-math/" target="_blank">Link</a></li>
    <li>Sai Spectrum, "A web application for the analysis of the spectrum," <a href="https://github.com/puspkml/Sai_Spectrum" target="_blank">GitHub</a></li>
  </ol>

</div>
