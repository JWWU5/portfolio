import { Project } from "../types";
import calibrationVideo from "../assets/calibration.mp4";
import colorVideo from "../assets/color.mp4";
import sagittalVideo from "../assets/sagittal.mp4";
import visualisationVideo from "../assets/visualisation.mp4";
import transverseImg from "../assets/transverse.png";
import sagittalImg from "../assets/sagittal.png";


export const PROJECTS: Project[] = [
  {
    id: "01",
    title: "SpinalXR: The Future of Physiotherapy",
    year: "2024.7 - 2025.3",
    description: "A Mixed Reality ecosystem for immersive, tactile physiotherapy training.",
    concept: "**Traditional physiotherapy** training relies on verbal feedback, while **internal bone movement remains invisible**. By integrating physical CPR training devices with a Unity-based MR application on Meta Quest 3, I designed a system that **visualises bone activities, and force data in real time**.",
    interaction: "Our application enables hands-on interaction with both virtual spinal models and physical devices. Users participate in immersive training experiences, manipulating digital anatomy while receiving tactile feedback from integrated hardware.",
    challenges: [
      { 
        issue: "Aligning virtual and physical devices", 
        solution: "To begin the calibration process, users generate a virtual cube that represents the internal spine model. This interaction is triggered using **a pinch gesture with the right hand**.\n\nThe gesture is detected through the **OVRInput API**, where the pinch action is mapped to Button.One. When the gesture is detected, the system retrieves the current position of the user’s right hand and spawns the virtual cube at that location.\n\n```csharp\nOVRInput.GetDown(OVRInput.Button.One) // detect the pinch gesture event\nOVRInput.GetLocalControllerPosition(OVRInput.Controller.RTouch) // retrieve the real-time position of the user's right hand\n```\n\nBy combining these two inputs, the system ensures that the virtual object appears exactly where the gesture occurs.\n\n---\n\nThe grab interaction of the cube is controlled by accessing the **HandGrab** component:\n\n```csharp\ncube.transform.Find(\"[BuildingBlock] HandGrab\")\n```\n\nThis line locates the HandGrab object attached to the cube, allowing the system to **enable or disable the grab interaction**. When disabled, the cube becomes fixed in space and can no longer be moved by the user." 
      },
      { 
        issue: "Mapping raw data to 3D Rotation", 
        solution: `
        **Up-down movement**

        \`\`\`csharp
        void UpDownMove() {
            float moveDist = 0;
            if (initialLeftDepth - leftDepth <= 0.02) {
                moveDist = 0;
            }
            else {
                moveDist = initialLeftDepth - averageDepth;
                Vector3 originalPosition = transform.localPosition;
                transform.localPosition = new Vector3(originalPosition.x, originalPosition.y, -moveDist * 0.005f);
            }
        }
        \`\`\`

        **A minimum threshold** is implemented to effectively filter out **baseline noise** and **sensor drift**, ensuring the system only triggers during user interaction.

        ---

        **Transverse Rotation**

        The ==_TransverseRotationDegree()_== function function computes the transverse rotation of a single bone based on the difference in depth between the left and right side of the bone. The function uses the bone's length **L<sub>bone</sub>** as a scaling factor:
        :::side-by-side
        ![Transverse Rotation](${transverseImg})

        - Only one side is pressed down:
        ==_**θ = sin(D<sub>left</sub> or D<sub>right</sub> / L<sub>bone</sub>)**_==
        - Both sides pressed:
        ==_**θ = sin((D<sub>left</sub> + D<sub>right</sub>) / 2 * L<sub>bone</sub>)**_==
        :::

        If **D<sub>left</sub> > D<sub>right</sub>**, the bone rotates positively (**θ**); otherwise, it rotates negatively (**-θ**).

        ---

        **Sagittal Rotation**

        First, identify the **focus bone** in each unity frame (the pressure is applied on this bone, therefore sagittal rotation does not applied on it).

        The next step is to calculate the rotation angle based on the relative position of the target bone to the focus bone:

        :::side-by-side
        ![Sagittal Rotation](${sagittalImg})

        - ==_**θ = arctan(D<sub>diff</sub> / D<sub>gap</sub>)**_==
        - **Ddiff**: represents the depth difference between the target bone and the focus bone.
        - **Dgap**: is a constant used to scale the distance between the target bone and the focus bone.
        :::
        `
      },
      {
        issue: "Real-time graph rendering",
        solution: "The graph was implemented using the **XCharts data visualisation library for Unity**, and displays two data streams:\n\n**1. (blue)Reference pattern**: a predefined benchmark representing the ideal force pattern.\n\n```csharp\nLoadDataFromCSV(string path) //read\nexpertTrial.AddData(i-1, y) //write\n```\n\n==_LoadDataFromCSV(string path)_== is used to read a dataset of 1500 force values stored in CSV file and ==_expertTrial.AddData(i-1, y)_== dynamically plots each value on a graph, mapping the dataset index to the x-axis and the corresponding force.\n\n-------\n\n**2. (green)User input**: real-time force data applied by the user during training.\n\nReal-time force data is received continuously from the **ESP32 microcontroller via Bluetooth**.\n\n```csharp\nstudentTrial.AddData(timer++, yaxis force)\n```\n\nThe system records the force values over time by using this method. To ensure stability during extended operation and prevent infinite graph scrolling, a **minimum threshold** is implemented to **detect active pressure on the device**."
      }
    ],
    hardware: ["SpinalLog (Physical Device)", "vARtebra (Haptic Model)", "Meta Quest 3", "Force Sensors"],
    software: ["Unity 3D", "C# / .NET", "MRTK 3", "Custom DICOM Shader", "Bluetooth Low Energy (BLE)"],
    image: "https://picsum.photos/seed/spinal-physio/1600/900",
    category: "Mixed Reality / Unity / Meta Quest 3 / MedTech",
    architecture: {
      nodes: [
        { id: 'h1', label: 'SpinalLog Hardware', type: 'hw' },
        { id: 'h2', label: 'Force Sensors', type: 'hw' },
        { id: 'b1', label: 'BLE Middleware', type: 'bridge' },
        { id: 's1', label: 'Unity Engine', type: 'sw' },
        { id: 's2', label: 'vARtebra Model', type: 'sw' },
        { id: 's3', label: 'MRTK Interaction', type: 'sw' }
      ],
      connections: [
        { from: 'h2', to: 'h1' },
        { from: 'h1', to: 'b1' },
        { from: 'b1', to: 's1' },
        { from: 's1', to: 's2' },
        { from: 's1', to: 's3' }
      ]
    },
    results: [
      { label: 'Spatial Accuracy', value: '< 2mm', description: 'Precision in virtual-physical alignment.' },
      { label: 'Latency', value: '12ms', description: 'End-to-end tactile response time.' },
      { label: 'Learning Efficiency', value: '+35%', description: 'Improvement in student anatomical retention.' }
    ],
    contribution: [
      "Lead Developer for the Unity-based Mixed Reality application.",
      "Designed and implemented the custom GPU volume rendering pipeline for DICOM data.",
      "Architected the BLE communication protocol between ESP32 hardware and Meta Quest 3.",
      "Conducted usability testing with 20+ physiotherapy professionals."
    ],
    inspiration: "Traditional physiotherapy training relies on verbal feedback, while **internal bone movement remains invisible**. By integrating physical CPR training devices with a Unity-based MR application on Meta Quest 3, I designed a system that **visualises bone activities, and force data in real time**.",
    features: [
      { title: "Calibration", detail: "Precise alignment between the physical SpinalLog device and the virtual vARtebra model.", video: calibrationVideo },
      { title: "Stress Response", detail: "As a safety mechanism, the internal bone structure transitions to a vivid red hue if excessive pressure is detected.", video: colorVideo },
      { title: "Transverse Rotation", detail: "Visual feedback for forces applied to the vertebral segments.", video: "/src/asserts/transverse.mp4" },
      { title: "Sagittal Rotation", detail: "Visual feedback for forces applied to the sagittal segments.", video: sagittalVideo },
      { title: "Pressure Visualisation", detail: "A dynamic graph allows users to compare their technique against expert benchmarks to refine precision.", video: visualisationVideo }
    ],
    future: [
      {
        title: "Streamlining calibration",
        content: "One of the possible solution is to have users point to two opposite corners, allowing our application to detect the finger positions and automatically allocate the virtual objects based on the inputs."
      },
      {
        title: "Data accuracy",
        content: "By gathering quantitative feedback and testing data, we can recalibrate the parameters in our functions for rotation calculation."
      },
      {
        title: "Graph Analysis",
        content: "A rating could be given to students after each trial to quantify their performance."
      }
    ],
    reflection: "Working on this project pushed me to explore a domain outside my original background. Integrating mixed reality with concepts from physiotherapy training required understanding both spatial computing and the underlying physical interactions being simulated.\n\nA large part of the development process involved independently learning the mixed reality ecosystem and experimenting with different approaches to interaction, calibration, and real-time visualisation. Through continuous iteration, research, and testing, the project gradually evolved from an initial concept into a fully functional prototype.\n\nMore importantly, the experience showed me how ideas can develop through iterative design — from early ideation and technical exploration to refining interaction details and polishing the final user experience. This process strengthened my confidence in turning ambitious concepts into working systems.",
    process: {
      description: "We followed a rigorous User-Centered Design (UCD) process, involving physiotherapists at every stage of development.",
      steps: [
        { title: "Discovery", detail: "Observing students in clinical labs to identify common errors in spinal palpation." },
        { title: "Prototyping", detail: "Iterative development of the SpinalLog hardware and vARtebra shaders." },
        { title: "User Testing", detail: "Formal usability studies with 20+ professionals to validate tactile accuracy." },
        { title: "Refinement", detail: "Polishing the UI and optimizing BLE latency based on expert feedback." }
      ]
    },
    videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4"
  },
  {
    id: "02",
    title: "HapticRehab",
    year: "2023",
    description: "A smart glove for neuro-rehabilitation.",
    concept: "HapticRehab focuses on restoring fine motor skills in stroke survivors. The system uses soft robotics and VR to create a closed-loop feedback system that adapts to the user's progress.",
    interaction: "Users wear a sensor-embedded glove and perform tasks in a virtual kitchen. The glove provides resistance and vibration feedback, simulating the weight and texture of virtual objects.",
    challenges: [
      { issue: "Latency in haptic feedback.", solution: "Optimized the firmware to achieve <15ms end-to-end latency." },
      { issue: "User fatigue.", solution: "Implemented an adaptive difficulty algorithm that scales based on real-time muscle tension data." }
    ],
    hardware: ["Custom Haptic Glove", "ESP32", "Pneumatic Actuators", "Oculus Rift S"],
    software: ["Unreal Engine 5", "Arduino C++", "Python (ML for gesture recognition)"],
    image: "https://picsum.photos/seed/haptic-glove/1600/900",
    category: "Soft Robotics / VR"
  },
  {
    id: "03",
    title: "Lumina",
    year: "2023",
    description: "Interactive light installation responding to biometric data.",
    concept: "Lumina explores the connection between the human heart and the environment. It translates the invisible rhythm of life into a collective visual symphony.",
    interaction: "Participants hold a copper sensor that captures their heart rate. The entire room's lighting pulses and changes color in sync with their heartbeat, creating a shared meditative space.",
    challenges: [
      { issue: "Signal noise from multiple users.", solution: "Developed a robust peak-detection algorithm to filter out environmental interference." },
      { issue: "Scalability.", solution: "Used a distributed DMX control system to manage 500+ individual LED nodes." }
    ],
    hardware: ["Pulse Sensors", "DMX Controllers", "Custom LED Arrays", "Raspberry Pi 4"],
    software: ["TouchDesigner", "Max/MSP", "Node.js"],
    image: "https://picsum.photos/seed/lumina-light/1600/900",
    category: "Interactive Art"
  },
  {
    id: "04",
    title: "PostureAI",
    year: "2022",
    description: "Real-time posture correction using computer vision.",
    concept: "PostureAI is a non-invasive tool designed for office workers. It uses a standard webcam to monitor posture and provides subtle haptic alerts through a wearable patch.",
    interaction: "The application runs in the background. When it detects slouching for more than 30 seconds, it sends a signal to a small wearable device on the user's neck to vibrate gently.",
    challenges: [
      { issue: "Privacy concerns.", solution: "Processed all video data locally on the edge device; no images are ever stored or uploaded." },
      { issue: "Lighting variability.", solution: "Trained a custom pose estimation model on a diverse dataset of indoor lighting conditions." }
    ],
    hardware: ["Webcam", "Custom Haptic Patch", "Nordic nRF52"],
    software: ["TensorFlow.js", "React", "Web Bluetooth API"],
    image: "https://picsum.photos/seed/posture-ai/1600/900",
    category: "Wearable Tech / AI"
  }
];
