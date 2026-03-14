import { Project } from "../types";
import calibrationVideo from "../assets/calibration.mp4";
import colorVideo from "../assets/color.mp4";
import sagittalVideo from "../assets/sagittal.mp4";
import visualisationVideo from "../assets/visualisation.mp4";
import transverseVideo from "../assets/transverse.mp4";
import transverseImg from "../assets/transverse.png";
import sagittalImg from "../assets/sagittal.png";


export const PROJECTS: Project[] = [
  {
    id: "spinalxr",
    title: "SpinalXR: The Future of Physiotherapy",
    year: "2024.7 - 2025.3",
    description: "A Mixed Reality application for advanced immersive physiotherapy training.",
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
    publication: {
      name: "CHI2025 LBW",
      url: "https://dl.acm.org/doi/10.1145/3706599.3719996"
    },
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
    features: [
      { title: "Calibration", detail: "Precise alignment between the physical SpinalLog device and the virtual vARtebra model.", video: calibrationVideo },
      { title: "Stress Response", detail: "As a safety mechanism, the internal bone structure transitions to a vivid red hue if excessive pressure is detected.", video: colorVideo },
      { title: "Transverse Rotation", detail: "Visual feedback for forces applied to the vertebral segments.", video: transverseVideo },
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
    
  },
  {
    id: "virtualland",
    title: "VirtualLand",
    year: "2024.3-2024.6",
    description: "VirtualLand is an interactive installation that combines sensors, ESP32 microcontrollers, and a Unity-based virtual environment. Users create personalised natural landscapes and sounds by interacting with a custom-built piano interface, transforming meditation into a creative multisensory experience.",
    inspiration: "Meditation and yoga classes often take place in indoor studios, making it difficult for participants to feel connected to nature. While virtual reality can create immersive environments, wearing headsets during physical activities may reduce safety and awareness.",
    interaction: "Users interact with a custom-built physical interface to influence the virtual world. Each interaction triggers specific environmental changes and soundscapes, allowing for a unique, meditative co-creation process.",
    challenges: [
      { issue: "Sensor noise and calibration", solution: "Implemented a moving average filter on the ESP32 to stabilize raw sensor data before sending it to Unity." },
      { issue: "Real-time environmental synchronization", solution: "Developed a custom event system in Unity that maps sensor inputs to procedural generation parameters for landscapes and audio." }
    ],
    hardware: ["ESP32", "Force Sensors", "3D Printed Components", "Custom PCB"],
    software: ["Unity 3D", "Arduino IDE", "C++", "C#"],
    image: "https://picsum.photos/seed/virtualland/1600/900",
    category: "Unity / ESP32 / 3D Print / Arduino / Soldering",
    architecture: {
      nodes: [
        { id: 'u1', label: 'Users', type: 'hw' },
        { id: 's1', label: 'Sensors (Buttons, Potentiometer)', type: 'hw' },
        { id: 'e1', label: 'ESP32 (Arduino)', type: 'bridge' },
        { id: 'u2', label: 'Unity Engine', type: 'sw' },
        { id: 'f1', label: 'Fan', type: 'hw' }
      ],
      connections: [
        { from: 'u1', to: 's1' },
        { from: 's1', to: 'e1' },
        { from: 'e1', to: 'u2' },
        { from: 'e1', to: 'f1' }
      ]
    }
  }
];

