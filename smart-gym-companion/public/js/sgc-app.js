/**
 * Smart Gym Companion - Posture & Nutrition Engine
 * All logic wrapped in an IIFE to prevent namespace conflicts in WordPress.
 */
(function($) {
    'use strict';

    // Muscle Map Database
    const muscleData = {
        chest: {
            title: "Pectoralis Major & Minor",
            category: "Upper Push",
            desc: "The primary pushing muscles of the upper body, responsible for arm adduction and internal rotation. Key compound movements build general upper-body mass.",
            exercises: [
                { name: "Barbell Bench Press", protocol: "3-4 Sets x 8-10 Reps", focus: "Elbow path and bar touch point", exKey: "bench" },
                { name: "Dumbbell Flyes", protocol: "3 Sets x 12-15 Reps", focus: "Stretch position at bottom, avoid elbow hyperextension" },
                { name: "Push-Ups (Bodyweight)", protocol: "3 Sets x Max Reps", focus: "Spine alignment, elbow angle" }
            ]
        },
        shoulders: {
            title: "Deltoids (Front, Lateral, Rear)",
            category: "Shoulder Press / Raise",
            desc: "Responsible for overhead pushing and raising the arms. Beginners must focus on keeping shoulders stable and avoiding excessive rotator cuff impingement.",
            exercises: [
                { name: "Overhead Barbell Press", protocol: "3 Sets x 8-10 Reps", focus: "Elbow path vertical, core locked", exKey: "ohp" },
                { name: "Lateral Raises (Dumbbell)", protocol: "3 Sets x 12-15 Reps", focus: "Lead with elbows, pinky finger slightly up" },
                { name: "Face Pulls", protocol: "3 Sets x 15 Reps", focus: "External shoulder rotation at peak contraction" }
            ]
        },
        arms: {
            title: "Biceps Brachii",
            category: "Elbow Flexion",
            desc: "Responsible for forearm supination and elbow flexion. Beginners should prevent their shoulders or hips from swinging to ensure the tension stays isolated on the bicep fibers.",
            exercises: [
                { name: "Standing Dumbbell Curl", protocol: "3 Sets x 10-12 Reps", focus: "Elbows pinned to ribs, full range of motion", exKey: "bicep_curl" },
                { name: "Incline Dumbbell Curl", protocol: "3 Sets x 8-10 Reps", focus: "Maximum stretch at bottom, elbow stationary" }
            ]
        },
        triceps: {
            title: "Triceps Brachii (Long, Lateral, Medial)",
            category: "Elbow Extension",
            desc: "Comprises 60% of upper arm size. Responsible for extending the elbow joint. Must be trained with full locking extension.",
            exercises: [
                { name: "Triceps Cable Pushdowns", protocol: "3 Sets x 12-15 Reps", focus: "Keep shoulders depressed, lock elbow at bottom" },
                { name: "Overhead Triceps Extension", protocol: "3 Sets x 10-12 Reps", focus: "Deep stretch, keep elbows tucked near ears" }
            ]
        },
        abs: {
            title: "Rectus Abdominis & Obliques",
            category: "Core Stabilization",
            desc: "Provides pelvic stability and spinal flexion/rotation. Rather than doing endless crunches, beginners should focus on isometric stability exercises.",
            exercises: [
                { name: "Lying Leg Raise", protocol: "3 Sets x 12-15 Reps", focus: "Flatten lower back against floor", exKey: "leg_raise" },
                { name: "Plank (Isometric)", protocol: "3 Sets x 45-60 Seconds", focus: "Squeeze glutes and quads, push floor away" },
                { name: "Ab Wheel Rollouts", protocol: "3 Sets x 8-10 Reps", focus: "Maintain posterior pelvic tilt (flat back)" }
            ]
        },
        quads: {
            title: "Quadriceps (Front Thigh)",
            category: "Knee Extension / Lower Push",
            desc: "Four major muscles on the front of the thigh. They control knee extension and are essential for squatting, jumping, and overall lower-body force.",
            exercises: [
                { name: "Barbell Back Squat", protocol: "4 Sets x 6-8 Reps", focus: "Knee tracking over toes, hip crease below parallel", exKey: "squat" },
                { name: "Leg Press", protocol: "3 Sets x 10-12 Reps", focus: "Do not lock knees completely at top, butt flat on seat" }
            ]
        },
        back: {
            title: "Latissimus Dorsi & Trapezius",
            category: "Upper Pull",
            desc: "The largest muscle group of the upper body, pulling the arms down and back. Crucial for posture, upper back thickness, and spinal support.",
            exercises: [
                { name: "Barbell Row", protocol: "4 Sets x 8-10 Reps", focus: "Hinge torso to 45°, pull with lats", exKey: "row" },
                { name: "Lat Pulldown (Wide Grip)", protocol: "3-4 Sets x 10-12 Reps", focus: "Pull with elbows, retract shoulder blades" },
                { name: "Seated Cable Row", protocol: "3 Sets x 10-12 Reps", focus: "Keep chest up, stretch forward without collapsing spine" }
            ]
        },
        lowerback: {
            title: "Erector Spinae",
            category: "Spinal Support",
            desc: "Responsible for keeping the trunk erect. Extremely prone to injury if beginners round their spine under load. Neutral posture is mandatory here.",
            exercises: [
                { name: "Barbell Deadlift", protocol: "3 Sets x 5 Reps", focus: "Spinal brace, hinge at hips, keep bar close to shins", exKey: "deadlift" },
                { name: "Hyperextensions", protocol: "3 Sets x 12-15 Reps", focus: "Hinge from hips, align spine at top" }
            ]
        },
        glutes: {
            title: "Gluteus Maximus, Medius & Minimus",
            category: "Hip Extension",
            desc: "The strongest muscles in the human body, responsible for hip extension and external rotation. Critical for lower back health and athletic power.",
            exercises: [
                { name: "Barbell Romanian Deadlift", protocol: "3 Sets x 8-10 Reps", focus: "Push hips back, stop when hip translation stops" },
                { name: "Hip Thrusts (Barbell)", protocol: "4 Sets x 10-12 Reps", focus: "Squeeze glutes at top, chin tucked, shins vertical" }
            ]
        },
        hamstrings: {
            title: "Hamstrings (Back Thigh)",
            category: "Knee Flexion / Hip Extension",
            desc: "Located on the back of the legs, active during leg curls and hip hinges. Crucial for knee stabilization during squats.",
            exercises: [
                { name: "Lying Leg Curls", protocol: "3 Sets x 10-12 Reps", focus: "Keep hips flat on pad, control eccentric phase" },
                { name: "Romanian Deadlift", protocol: "3 Sets x 8-10 Reps", focus: "Keep knees slightly soft, load hamstrings at hips" }
            ]
        },
        calves: {
            title: "Gastrocnemius & Soleus",
            category: "Plantar Flexion",
            desc: "The lower leg muscles. Crucial for ankle stability. Responds best to deep stretches and slow, controlled contractions.",
            exercises: [
                { name: "Standing Calf Raises", protocol: "4 Sets x 15-20 Reps", focus: "Pause at bottom stretch for 2 seconds, squeeze peak" }
            ]
        },
        forearms: {
            title: "Brachioradialis & Flexors",
            category: "Grip Strength",
            desc: "Controls grip strength and wrist alignment. Often trained indirectly via heavy pulling, but direct work builds grip integrity.",
            exercises: [
                { name: "Reverse Barbell Curl", protocol: "3 Sets x 12 Reps", focus: "Isolate wrist extensors, keep elbows locked in place" }
            ]
        }
    };

    // Exercise Joint Configuration for Angle Visualizer
    const exerciseConfig = {
        squat: {
            title: "Barbell Back Squat",
            primaryJoint: "Knee",
            romRange: "80° - 180°",
            optimalAngle: "80° - 100° (Below Parallel)",
            riskAngle: "Under 75° (Too deep / lumbar butt-wink) or Over 120° (Partial squat)",
            mistakeLabel: "Valgus Knee Collapse & Excessive Spine Lean",
            baseCue: "Keep heels flat, push knees outward tracking your toes.",
            mistakeCue: "Knees caving inwards causes high stress on the ACL. Extreme forward lean causes lumbar strain.",
            // Visual coordinates generator (start: 0 = standing, bottom: 100 = full squat)
            getCoords: function(romVal, isMistake) {
                const ratio = romVal / 100;
                
                // Standing baseline
                const start = {
                    ankle: { x: 250, y: 350 },
                    knee:  { x: 250, y: 270 },
                    hip:   { x: 250, y: 190 },
                    shoulder: { x: 250, y: 110 },
                    head:  { x: 250, y: 80 },
                    bar:   { x: 250, y: 115 }
                };

                // Good form deep squat bottom
                const bottomGood = {
                    ankle: { x: 250, y: 350 },
                    knee:  { x: 195, y: 295 }, // Knee pushes forward slightly
                    hip:   { x: 282, y: 298 }, // Hip sits back & down (below knee level)
                    shoulder: { x: 260, y: 185 }, // Shoulder leans forward to balance
                    head:  { x: 265, y: 145 },
                    bar:   { x: 260, y: 190 }
                };

                // Bad form squat bottom (folding forward + knees stuck back/caving)
                const bottomBad = {
                    ankle: { x: 250, y: 350 },
                    knee:  { x: 220, y: 285 }, // Knee doesn't track forward, hips shoot back
                    hip:   { x: 310, y: 280 }, // Hip pushed way back
                    shoulder: { x: 320, y: 190 }, // Massive forward lean, folding torso
                    head:  { x: 330, y: 155 },
                    bar:   { x: 320, y: 195 }
                };

                const target = isMistake ? bottomBad : bottomGood;

                // Interpolate
                return {
                    ankle: interpolate(start.ankle, target.ankle, ratio),
                    knee: interpolate(start.knee, target.knee, ratio),
                    hip: interpolate(start.hip, target.hip, ratio),
                    shoulder: interpolate(start.shoulder, target.shoulder, ratio),
                    head: interpolate(start.head, target.head, ratio),
                    bar: interpolate(start.bar, target.bar, ratio)
                };
            }
        },
        bench: {
            title: "Barbell Bench Press",
            primaryJoint: "Elbow",
            romRange: "80° - 180°",
            optimalAngle: "80° - 90° (Bar touching chest)",
            riskAngle: "Over 100° (Bounce reps, shallow depth) or Elbow flaring",
            mistakeLabel: "Elbow Flaring (90° Shoulder Angle)",
            baseCue: "Keep shoulders retracted, tuck elbows at 45° relative to your torso.",
            mistakeCue: "Flaring elbows to 90° places extreme torque on the rotator cuffs and anterior shoulder capsules.",
            getCoords: function(romVal, isMistake) {
                const ratio = romVal / 100;
                
                // Torso coordinates (fixed lying flat on bench at y=230)
                // Head is at right, hips to left
                const start = {
                    head: { x: 340, y: 230 },
                    shoulder: { x: 270, y: 230 },
                    hip: { x: 160, y: 230 },
                    // Arm coords (standing/pressing bar up)
                    elbow: { x: 270, y: 170 }, // Elbow straight
                    wrist: { x: 270, y: 110 }, // Hand holding bar
                    bar: { x: 270, y: 105 }
                };

                // Good form (elbows tucked)
                const bottomGood = {
                    head: { x: 340, y: 230 },
                    shoulder: { x: 270, y: 230 },
                    hip: { x: 160, y: 230 },
                    // Elbow bends down and slightly left (towards hip/tucked)
                    elbow: { x: 235, y: 270 },
                    wrist: { x: 270, y: 220 }, // Bar touches sternum
                    bar: { x: 270, y: 215 }
                };

                // Bad form (elbows flared straight out)
                const bottomBad = {
                    head: { x: 340, y: 230 },
                    shoulder: { x: 270, y: 230 },
                    hip: { x: 160, y: 230 },
                    // Elbow flares straight downwards
                    elbow: { x: 270, y: 285 },
                    wrist: { x: 270, y: 220 },
                    bar: { x: 270, y: 215 }
                };

                const target = isMistake ? bottomBad : bottomGood;

                return {
                    head: start.head,
                    shoulder: start.shoulder,
                    hip: start.hip,
                    elbow: interpolate(start.elbow, target.elbow, ratio),
                    wrist: interpolate(start.wrist, target.wrist, ratio),
                    bar: interpolate(start.bar, target.bar, ratio)
                };
            }
        },
        deadlift: {
            title: "Conventional Deadlift",
            primaryJoint: "Spine / Hip",
            romRange: "75° - 180°",
            optimalAngle: "Straight spine (180° Neutral)",
            riskAngle: "Spinal flexion (Curved back) causes extreme disk stress",
            mistakeLabel: "Cat-back Spinal Flexion (Lumbar Rounding)",
            baseCue: "Drive your chest up, pull the slack out of the bar, push through the floor.",
            mistakeCue: "Rounding your lower back loads the spine in flexion under high tension, leading to disc herniations.",
            getCoords: function(romVal, isMistake) {
                const ratio = romVal / 100;
                
                // Start position (bar on floor at y=330)
                const startGood = {
                    ankle: { x: 230, y: 350 },
                    knee: { x: 195, y: 310 },
                    hip: { x: 285, y: 245 },
                    shoulder: { x: 230, y: 175 }, // Straight spine hip-shoulder
                    head: { x: 260, y: 145 },
                    bar: { x: 205, y: 320 }
                };

                const startBad = {
                    ankle: { x: 230, y: 350 },
                    knee: { x: 205, y: 325 },
                    hip: { x: 280, y: 240 },
                    shoulder: { x: 225, y: 190 }, // Spine is curved (rounded deadlift)
                    head: { x: 250, y: 175 },
                    bar: { x: 205, y: 320 }
                };

                // Stand up Lockout (100%)
                const lockout = {
                    ankle: { x: 230, y: 350 },
                    knee: { x: 230, y: 265 },
                    hip: { x: 230, y: 180 },
                    shoulder: { x: 230, y: 100 },
                    head: { x: 230, y: 70 },
                    bar: { x: 205, y: 195 }
                };

                const start = isMistake ? startBad : startGood;

                return {
                    ankle: interpolate(start.ankle, lockout.ankle, ratio),
                    knee: interpolate(start.knee, lockout.knee, ratio),
                    hip: interpolate(start.hip, lockout.hip, ratio),
                    shoulder: interpolate(start.shoulder, lockout.shoulder, ratio),
                    head: interpolate(start.head, lockout.head, ratio),
                    bar: interpolate(start.bar, lockout.bar, ratio)
                };
            }
        },
        bicep_curl: {
            title: "Standing Bicep Curl",
            primaryJoint: "Elbow",
            romRange: "40° - 180°",
            optimalAngle: "40° (Peak contraction) - 180° (Full extension)",
            riskAngle: "Swinging elbows forward shifts load to anterior deltoid",
            mistakeLabel: "Cheating Form (Elbows swinging forward)",
            baseCue: "Keep your elbows locked at your side. Do not let your shoulders move.",
            mistakeCue: "Pushing elbows forward cheats the bicep. It relieves tension and strains the shoulders.",
            getCoords: function(romVal, isMistake) {
                const ratio = romVal / 100;
                
                // Stable body frame (standing side-on)
                const start = {
                    ankle: { x: 260, y: 350 },
                    knee: { x: 260, y: 275 },
                    hip: { x: 260, y: 200 },
                    shoulder: { x: 260, y: 120 },
                    head: { x: 260, y: 90 },
                    // Arm extended (0% ROM)
                    elbow: { x: 260, y: 180 },
                    wrist: { x: 260, y: 240 },
                    dumbbell: { x: 260, y: 250 }
                };

                // Good Curl (elbow locked at side)
                const peakGood = {
                    ankle: { x: 260, y: 350 },
                    knee: { x: 260, y: 275 },
                    hip: { x: 260, y: 200 },
                    shoulder: { x: 260, y: 120 },
                    head: { x: 260, y: 90 },
                    elbow: { x: 262, y: 180 }, // Elbow stays at x=260
                    wrist: { x: 228, y: 135 }, // Hand curls up and left
                    dumbbell: { x: 224, y: 125 }
                };

                // Bad Curl (swinging elbow forward)
                const peakBad = {
                    ankle: { x: 260, y: 350 },
                    knee: { x: 260, y: 275 },
                    hip: { x: 260, y: 200 },
                    shoulder: { x: 260, y: 120 },
                    head: { x: 260, y: 90 },
                    elbow: { x: 220, y: 155 }, // Elbow pushed forward
                    wrist: { x: 250, y: 90 }, // Wrist curls too high
                    dumbbell: { x: 250, y: 80 }
                };

                const target = isMistake ? peakBad : peakGood;

                return {
                    ankle: start.ankle,
                    knee: start.knee,
                    hip: start.hip,
                    shoulder: start.shoulder,
                    head: start.head,
                    elbow: interpolate(start.elbow, target.elbow, ratio),
                    wrist: interpolate(start.wrist, target.wrist, ratio),
                    dumbbell: interpolate(start.dumbbell, target.dumbbell, ratio)
                };
            }
        },
        ohp: {
            title: "Overhead Press",
            primaryJoint: "Elbow / Spine",
            romRange: "80° - 180°",
            optimalAngle: "80° (Bottom start) - 180° (Lockout overhead)",
            riskAngle: "Under 85° (Incomplete press) or excessive laying back",
            mistakeLabel: "Extreme Lumbar Arching (Layback)",
            baseCue: "Keep core and glutes locked tight to maintain a neutral spine as you press the bar straight up.",
            mistakeCue: "Pushing hips forward and laying back transfers shear stress to the lumbar spine, risking compression injury.",
            getCoords: function(romVal, isMistake) {
                const ratio = romVal / 100;
                
                const start = {
                    ankle: { x: 250, y: 350 },
                    knee: { x: 250, y: 275 },
                    hip: { x: 250, y: 200 },
                    shoulder: { x: 250, y: 120 },
                    head: { x: 250, y: 90 },
                    elbow: { x: 250, y: 165 },
                    wrist: { x: 252, y: 122 },
                    bar: { x: 252, y: 117 }
                };

                const peakGood = {
                    ankle: { x: 250, y: 350 },
                    knee: { x: 250, y: 275 },
                    hip: { x: 250, y: 200 },
                    shoulder: { x: 250, y: 120 },
                    head: { x: 250, y: 90 },
                    elbow: { x: 250, y: 75 },
                    wrist: { x: 250, y: 35 },
                    bar: { x: 250, y: 30 }
                };

                const peakBad = {
                    ankle: { x: 250, y: 350 },
                    knee: { x: 245, y: 275 },
                    hip: { x: 220, y: 195 },
                    shoulder: { x: 272, y: 130 },
                    head: { x: 285, y: 105 },
                    elbow: { x: 275, y: 85 },
                    wrist: { x: 268, y: 45 },
                    bar: { x: 268, y: 40 }
                };

                const target = isMistake ? peakBad : peakGood;

                return {
                    ankle: start.ankle,
                    knee: start.knee,
                    hip: interpolate(start.hip, target.hip, ratio),
                    shoulder: interpolate(start.shoulder, target.shoulder, ratio),
                    head: interpolate(start.head, target.head, ratio),
                    elbow: interpolate(start.elbow, target.elbow, ratio),
                    wrist: interpolate(start.wrist, target.wrist, ratio),
                    bar: interpolate(start.bar, target.bar, ratio)
                };
            }
        },
        row: {
            title: "Barbell Row",
            primaryJoint: "Elbow / Torso",
            romRange: "90° - 180°",
            optimalAngle: "90° (Top contraction) - 180° (Bottom stretch)",
            riskAngle: "Spine rounding or standing too vertical",
            mistakeLabel: "Shrugging Upright Row (Flared Elbows)",
            baseCue: "Hinge at the hips to 45° - 60°, pull the bar to your lower ribs, squeezing your lats.",
            mistakeCue: "Standing too upright disengages the lats, turning the row into a shrug, overloading the upper traps.",
            getCoords: function(romVal, isMistake) {
                const ratio = romVal / 100;
                
                const startGood = {
                    ankle: { x: 230, y: 350 },
                    knee: { x: 215, y: 300 },
                    hip: { x: 275, y: 240 },
                    shoulder: { x: 205, y: 200 },
                    head: { x: 185, y: 180 },
                    elbow: { x: 210, y: 245 },
                    wrist: { x: 208, y: 290 },
                    bar: { x: 208, y: 295 }
                };

                const peakGood = {
                    ankle: { x: 230, y: 350 },
                    knee: { x: 215, y: 300 },
                    hip: { x: 275, y: 240 },
                    shoulder: { x: 205, y: 200 },
                    head: { x: 185, y: 180 },
                    elbow: { x: 245, y: 185 },
                    wrist: { x: 220, y: 215 },
                    bar: { x: 220, y: 210 }
                };

                const startBad = {
                    ankle: { x: 230, y: 350 },
                    knee: { x: 220, y: 295 },
                    hip: { x: 260, y: 220 },
                    shoulder: { x: 230, y: 150 },
                    head: { x: 225, y: 120 },
                    elbow: { x: 232, y: 200 },
                    wrist: { x: 230, y: 250 },
                    bar: { x: 230, y: 255 }
                };

                const peakBad = {
                    ankle: { x: 230, y: 350 },
                    knee: { x: 220, y: 295 },
                    hip: { x: 260, y: 220 },
                    shoulder: { x: 230, y: 150 },
                    head: { x: 225, y: 120 },
                    elbow: { x: 260, y: 160 },
                    wrist: { x: 235, y: 180 },
                    bar: { x: 235, y: 175 }
                };

                const start = isMistake ? startBad : startGood;
                const target = isMistake ? peakBad : peakGood;

                return {
                    ankle: start.ankle,
                    knee: start.knee,
                    hip: interpolate(start.hip, target.hip, ratio),
                    shoulder: interpolate(start.shoulder, target.shoulder, ratio),
                    head: interpolate(start.head, target.head, ratio),
                    elbow: interpolate(start.elbow, target.elbow, ratio),
                    wrist: interpolate(start.wrist, target.wrist, ratio),
                    bar: interpolate(start.bar, target.bar, ratio)
                };
            }
        },
        leg_raise: {
            title: "Lying Leg Raise",
            primaryJoint: "Hip Crease",
            romRange: "90° - 180°",
            optimalAngle: "90° (Legs raised vertical) - 180° (Legs hovered flat)",
            riskAngle: "Arched lumbar spine disengaging abs",
            mistakeLabel: "Lower Back Arching (Lifting Spine)",
            baseCue: "Press your lower back flat into the floor, brace your core, and lower legs without arching.",
            mistakeCue: "Lifting the lumbar spine shifts the load to hip flexors, creating spinal extension torque under stress.",
            getCoords: function(romVal, isMistake) {
                const ratio = romVal / 100;
                
                const start = {
                    head: { x: 160, y: 335 },
                    shoulder: { x: 200, y: 335 },
                    hip: { x: 280, y: 335 },
                    knee: { x: 345, y: 335 },
                    ankle: { x: 410, y: 335 }
                };

                const peakGood = {
                    head: { x: 160, y: 335 },
                    shoulder: { x: 200, y: 335 },
                    hip: { x: 280, y: 335 },
                    knee: { x: 280, y: 255 },
                    ankle: { x: 280, y: 195 }
                };

                return {
                    head: start.head,
                    shoulder: start.shoulder,
                    hip: start.hip,
                    knee: interpolate(start.knee, peakGood.knee, ratio),
                    ankle: interpolate(start.ankle, peakGood.ankle, ratio)
                };
            }
        }
    };

    // Interpolation utility
    function interpolate(startPt, endPt, ratio) {
        return {
            x: startPt.x + (endPt.x - startPt.x) * ratio,
            y: startPt.y + (endPt.y - startPt.y) * ratio
        };
    }

    // Mathematical Angle Calculator (Vector math)
    // Calculates angle at point B, between BA and BC
    function calculateJointAngle(ptA, ptB, ptC) {
        if (!ptA || !ptB || !ptC) return 180;
        
        let BA = { x: ptA.x - ptB.x, y: ptA.y - ptB.y };
        let BC = { x: ptC.x - ptB.x, y: ptC.y - ptB.y };
        
        let dotProduct = BA.x * BC.x + BA.y * BC.y;
        let magBA = Math.sqrt(BA.x * BA.x + BA.y * BA.y);
        let magBC = Math.sqrt(BC.x * BC.x + BC.y * BC.y);
        
        if (magBA * magBC === 0) return 180;
        
        let cosTheta = dotProduct / (magBA * magBC);
        // Clamp to avoid float precision bugs
        cosTheta = Math.max(-1, Math.min(1, cosTheta));
        
        let angleRad = Math.acos(cosTheta);
        return Math.round(angleRad * (180 / Math.PI));
    }

    // ==========================================================================
    // INITIALIZATION & TAB SWITCHING
    // ==========================================================================
    $(document).ready(function() {
        initTabs();
        initAnatomyMap();
        initVisualizer();
        initCalculator();
        initPlaybook();
    });

    function initTabs() {
        $('.sgc-tab-btn').on('click', function() {
            const targetTab = $(this).data('tab');
            
            // Switch tabs styling
            $('.sgc-tab-btn').removeClass('active');
            $(this).addClass('active');
            
            // Switch tab content panels
            $('.sgc-tab-content').removeClass('active');
            $(`#sgc-tab-${targetTab}`).addClass('active');
        });
    }

    // ==========================================================================
    // ANATOMY MAP ENGINE
    // ==========================================================================
    function initAnatomyMap() {
        // Front/Back view toggle buttons
        $('#sgc-body-front-btn').on('click', function() {
            $('.sgc-toggle-btn').removeClass('active');
            $(this).addClass('active');
            $('#sgc-anatomy-back').removeClass('active');
            $('#sgc-anatomy-front').addClass('active');
        });

        $('#sgc-body-back-btn').on('click', function() {
            $('.sgc-toggle-btn').removeClass('active');
            $(this).addClass('active');
            $('#sgc-anatomy-front').removeClass('active');
            $('#sgc-anatomy-back').addClass('active');
        });

        // Click handler for muscle groups
        $('.sgc-muscle').on('click', function() {
            const muscleKey = $(this).data('muscle');
            selectMuscle(muscleKey);
        });

        // Quick Link target buttons
        $('.sgc-mini-btn').on('click', function() {
            const muscleKey = $(this).data('target-muscle');
            
            // If muscle is on the back view, toggle view first
            if (['back', 'lowerback', 'triceps', 'glutes', 'hamstrings'].includes(muscleKey)) {
                $('#sgc-body-back-btn').trigger('click');
            } else {
                $('#sgc-body-front-btn').trigger('click');
            }

            selectMuscle(muscleKey);
        });

        function selectMuscle(key) {
            if (!muscleData[key]) return;

            // Highlight in SVG
            $('.sgc-muscle').removeClass('active');
            $(`.sgc-muscle[data-muscle="${key}"]`).addClass('active');

            // Swap info panel view
            $('#sgc-muscle-default-view').removeClass('active');
            $('#sgc-muscle-detail-view').addClass('active');

            // Populate panel
            const data = muscleData[key];
            $('#sgc-muscle-title').text(data.title);
            $('#sgc-muscle-category').text(data.category);
            $('#sgc-muscle-desc').text(data.desc);

            // Populate exercises stack
            const $list = $('#sgc-exercise-list');
            $list.empty();

            data.exercises.forEach(function(ex) {
                let angleBtn = '';
                if (ex.exKey) {
                    angleBtn = `
                        <button class="sgc-view-angle-btn" data-exkey="${ex.exKey}">
                            <span>View Angle Guide</span>
                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                        </button>
                    `;
                }

                const cardHtml = `
                    <div class="sgc-ex-card">
                        <div class="sgc-ex-info">
                            <h5>${ex.name}</h5>
                            <p>Focus: ${ex.focus}</p>
                        </div>
                        <div class="sgc-ex-protocol">
                            <span class="sgc-ex-protocol-lbl">${ex.protocol}</span>
                            ${angleBtn}
                        </div>
                    </div>
                `;
                $list.append(cardHtml);
            });

            // Add action to the dynamically created "View Angle Guide" button
            $('.sgc-view-angle-btn').on('click', function() {
                const exKey = $(this).data('exkey');
                loadExerciseIntoVisualizer(exKey);
            });
        }
    }

    function loadExerciseIntoVisualizer(exKey) {
        // Switch to the Visualizer Tab
        $(`.sgc-tab-btn[data-tab="posture-visualizer"]`).trigger('click');
        
        // Select the exercise button in visualizer panel
        $(`.sgc-ex-select-btn[data-ex="${exKey}"]`).trigger('click');
    }

    // ==========================================================================
    // JOINT ANGLE VISUALIZER ENGINE
    // ==========================================================================
    let currentEx = 'squat';
    let isPlayAnimating = false;

    function initVisualizer() {
        // Exercise Selector buttons
        $('.sgc-ex-select-btn').on('click', function() {
            $('.sgc-ex-select-btn').removeClass('active');
            $(this).addClass('active');
            currentEx = $(this).data('ex');
            
            // Reset slider
            $('#sgc-rom-slider').val(0);
            
            updateVisualizer();
        });

        // Range Slider scrubbing
        $('#sgc-rom-slider').on('input', function() {
            updateVisualizer();
        });

        // Mistake check toggler
        $('#sgc-toggle-mistake').on('change', function() {
            updateVisualizer();
        });

        // Play Concentric/Eccentric Animation
        $('#sgc-play-btn').on('click', function() {
            if (isPlayAnimating) return;
            isPlayAnimating = true;
            $(this).addClass('disabled').css('opacity', '0.5');
            
            let slider = $('#sgc-rom-slider');
            let currentVal = 0;
            slider.val(0);

            // Animate outwards (Eccentric/Flexion target)
            let timerOut = setInterval(function() {
                currentVal += 2;
                slider.val(currentVal);
                updateVisualizer();

                if (currentVal >= 100) {
                    clearInterval(timerOut);
                    
                    // Hold peak for 600ms, then return back (Concentric)
                    setTimeout(function() {
                        let timerIn = setInterval(function() {
                            currentVal -= 2;
                            slider.val(currentVal);
                            updateVisualizer();

                            if (currentVal <= 0) {
                                clearInterval(timerIn);
                                isPlayAnimating = false;
                                $('#sgc-play-btn').removeClass('disabled').css('opacity', '1');
                            }
                        }, 15);
                    }, 600);
                }
            }, 15);
        });

        // Run initial draw
        updateVisualizer();
    }

    function updateVisualizer() {
        const romVal = parseInt($('#sgc-rom-slider').val());
        const isMistake = $('#sgc-toggle-mistake').is(':checked');
        const config = exerciseConfig[currentEx];
        
        // Update labels
        $('#sgc-vis-title').text(config.title);
        
        // Draw Skeleton onto SVG
        const coords = config.getCoords(romVal, isMistake);
        drawSkeleton(coords, isMistake);

        // Calculate and Render Live Angles
        let calculatedAngle = 180;
        let safetyRating = 'OPTIMAL';
        let badgeClass = 'badge-green';
        let barColor = 'var(--success)';
        let verdict = '';
        let stressActive = false;

        if (currentEx === 'squat') {
            // Angle at knee between Hip-Knee and Knee-Ankle
            calculatedAngle = calculateJointAngle(coords.hip, coords.knee, coords.ankle);
            
            if (isMistake) {
                safetyRating = 'DANGER';
                badgeClass = 'badge-red';
                barColor = 'var(--danger)';
                verdict = 'CRITICAL ERRORS: Knees collapsed inwards (valgus collapse), creating lateral stress on ACL. Torso leaning excessively forward, shifting shear load to the lumbar spine.';
                stressActive = true;
            } else {
                if (calculatedAngle > 120) {
                    safetyRating = 'OPTIMAL';
                    badgeClass = 'badge-green';
                    verdict = 'Standing / Initial descent. Keep core tight and brace before dropping.';
                } else if (calculatedAngle >= 80 && calculatedAngle <= 100) {
                    safetyRating = 'PERFECT DEPTH';
                    badgeClass = 'badge-green';
                    verdict = 'Excellent squat depth! Hip crease has dropped below knee height. Maximum glute and quad activation.';
                } else {
                    safetyRating = 'PARTIAL RANGE';
                    badgeClass = 'badge-yellow';
                    barColor = 'var(--warning)';
                    verdict = 'Knee angle above parallel. Squat deeper (if mobility allows) to recruit full muscle fiber density.';
                }
            }
        } 
        else if (currentEx === 'bench') {
            // Angle at elbow between Shoulder-Elbow and Elbow-Wrist
            calculatedAngle = calculateJointAngle(coords.shoulder, coords.elbow, coords.wrist);
            
            if (isMistake) {
                safetyRating = 'WARNING';
                badgeClass = 'badge-red';
                barColor = 'var(--danger)';
                verdict = 'CRITICAL ERROR: Elbows flared at 90° relative to torso. Rotator cuff tendons are heavily pinched. Reposition elbows to a tucked 45° angle.';
                stressActive = true;
            } else {
                if (calculatedAngle > 140) {
                    safetyRating = 'LOCKOUT';
                    badgeClass = 'badge-green';
                    verdict = 'Bar extended at lockout. Keep shoulder blades pinched down into the bench.';
                } else if (calculatedAngle >= 80 && calculatedAngle <= 95) {
                    safetyRating = 'OPTIMAL';
                    badgeClass = 'badge-green';
                    verdict = 'Excellent chest touch point. Elbows tucked at 45° providing optimal pectoral stretch and safety.';
                } else {
                    safetyRating = 'MID-PHASE';
                    badgeClass = 'badge-green';
                    verdict = 'Descending phase. Keep bar path controlled and press upwards with force.';
                }
            }
        } 
        else if (currentEx === 'deadlift') {
            // Angle at hip / spine. We check angle between Knee-Hip and Hip-Shoulder
            calculatedAngle = calculateJointAngle(coords.knee, coords.hip, coords.shoulder);
            
            if (isMistake) {
                safetyRating = 'EXTREME DANGER';
                badgeClass = 'badge-red';
                barColor = 'var(--danger)';
                verdict = 'CRITICAL POSTURE FLUSH: Lumbar spine is severely rounded ("cat-back"). The loading forces are completely shifted from hips to the spinal ligaments. Stop immediately!';
                stressActive = true;
            } else {
                if (calculatedAngle > 165) {
                    safetyRating = 'LOCKOUT';
                    badgeClass = 'badge-green';
                    verdict = 'Fully erect posture. Squeeze glutes at top. Avoid hyper-extending the lower back backwards.';
                } else if (calculatedAngle > 100) {
                    safetyRating = 'MID-PULL';
                    badgeClass = 'badge-green';
                    verdict = 'Excellent leg drive. Keep bar sliding against thighs, shoulders locked back.';
                } else {
                    safetyRating = 'SETUP START';
                    badgeClass = 'badge-green';
                    verdict = 'Proper startup: Back is flat and neutral, shins touching the bar, hips loaded.';
                }
            }
        } 
        else if (currentEx === 'bicep_curl') {
            // Angle at elbow between Shoulder-Elbow and Elbow-Wrist
            calculatedAngle = calculateJointAngle(coords.shoulder, coords.elbow, coords.wrist);
            
            if (isMistake) {
                safetyRating = 'INEFFECTIVE';
                badgeClass = 'badge-yellow';
                barColor = 'var(--warning)';
                verdict = 'FORM ERROR: Elbows swung forward. The front deltoid has taken over the movement. Tension on the bicep has plummeted by over 50%. Keep elbows pinned!';
                stressActive = true;
            } else {
                if (calculatedAngle > 150) {
                    safetyRating = 'STRETCH';
                    badgeClass = 'badge-green';
                    verdict = 'Full extension. Squeeze the triceps slightly to ensure full length stretch.';
                } else if (calculatedAngle <= 55) {
                    safetyRating = 'PEAK LOAD';
                    badgeClass = 'badge-green';
                    verdict = 'Max flexed peak contraction. Squeeze biceps hard without pulling elbows forward.';
                } else {
                    safetyRating = 'MID-RANGE';
                    badgeClass = 'badge-green';
                    verdict = 'Keep the velocity controlled, avoiding torso rocking/momentum.';
                }
            }
        }
        else if (currentEx === 'ohp') {
            // Angle at elbow between Shoulder-Elbow and Elbow-Wrist
            calculatedAngle = calculateJointAngle(coords.shoulder, coords.elbow, coords.wrist);
            
            if (isMistake) {
                safetyRating = 'DANGER';
                badgeClass = 'badge-red';
                barColor = 'var(--danger)';
                verdict = 'CRITICAL POSTURE: Back is excessively arched. Pushing hips forward and leaning back redirects high shearing pressure onto lumbar vertebrae. Lock your core and glutes!';
                stressActive = true;
            } else {
                if (calculatedAngle < 95) {
                    safetyRating = 'START PHASE';
                    badgeClass = 'badge-green';
                    verdict = 'Bar resting near chest level. Keep core braced, glutes squeezed, and prepare to push vertically.';
                } else if (calculatedAngle >= 165) {
                    safetyRating = 'LOCKOUT';
                    badgeClass = 'badge-green';
                    verdict = 'Perfect vertical lockout overhead! Keep shoulders shrugged slightly up to support the load safely.';
                } else {
                    safetyRating = 'MID-DRIVE';
                    badgeClass = 'badge-green';
                    verdict = 'Pushing bar upward. Keep head tilted back slightly until the bar passes your face, then push head forward.';
                }
            }
        }
        else if (currentEx === 'row') {
            // Angle at elbow between Shoulder-Elbow and Elbow-Wrist
            calculatedAngle = calculateJointAngle(coords.shoulder, coords.elbow, coords.wrist);
            
            if (isMistake) {
                safetyRating = 'WARNING';
                badgeClass = 'badge-red';
                barColor = 'var(--danger)';
                verdict = 'FORM ERROR: Torso is too upright (shrugging motion) and elbows are flared out. This disengages the lat fibers and overworks the upper traps. Keep hinged to 45°!';
                stressActive = true;
            } else {
                if (calculatedAngle > 155) {
                    safetyRating = 'STRETCH';
                    badgeClass = 'badge-green';
                    verdict = 'Full reach at bottom. Allow shoulder blades to stretch forward, keeping spine flat and neutral.';
                } else if (calculatedAngle <= 100) {
                    safetyRating = 'PEAK SQUEEZE';
                    badgeClass = 'badge-green';
                    verdict = 'Excellent lat contraction! Bar pulled to lower ribs. Hold peak briefly and control the descent.';
                } else {
                    safetyRating = 'MID-PULL';
                    badgeClass = 'badge-green';
                    verdict = 'Pulling bar up. Focus on driving elbows back behind your hips, rather than lifting with your wrists.';
                }
            }
        }
        else if (currentEx === 'leg_raise') {
            // Angle at hip crease: between Shoulder-Hip and Hip-Knee
            calculatedAngle = calculateJointAngle(coords.shoulder, coords.hip, coords.knee);
            
            // To simulate lumbar arching mistake:
            if (isMistake) {
                safetyRating = 'WARNING';
                badgeClass = 'badge-red';
                barColor = 'var(--danger)';
                verdict = 'CRITICAL FORM ERROR: Lower back is arching off the floor as legs descend. This transfers high stress to the hip flexors and loads the lumbar spine. Force your lower back flat!';
                stressActive = true;
            } else {
                if (calculatedAngle > 165) {
                    safetyRating = 'BOTTOM HOVER';
                    badgeClass = 'badge-green';
                    verdict = 'Optimal hover. Hold legs 2-6 inches off floor. Ensure lower back is flat against the mat.';
                } else if (calculatedAngle <= 105) {
                    safetyRating = 'PEAK FLEXION';
                    badgeClass = 'badge-green';
                    verdict = 'Legs vertical at 90°. Abs are contracted. Lower your legs slowly, taking 3 seconds.';
                } else {
                    safetyRating = 'MID-PHASE';
                    badgeClass = 'badge-green';
                    verdict = 'Legs rising/lowering. Maintain a tight abdominal brace and exhale on the way up.';
                }
            }
        }

        // Apply feedback values
        $('#sgc-primary-angle-text').text(`${calculatedAngle}°`);
        $('#sgc-safety-rating')
            .removeClass('badge-green badge-yellow badge-red')
            .addClass(badgeClass)
            .text(safetyRating);

        $('#sgc-gauge-fill')
            .removeClass('warning danger')
            .css('width', `${(calculatedAngle / 180) * 100}%`)
            .css('background-color', barColor);

        if (badgeClass === 'badge-yellow') $('#sgc-gauge-fill').addClass('warning');
        if (badgeClass === 'badge-red') $('#sgc-gauge-fill').addClass('danger');

        $('#sgc-angle-verdict').text(verdict);
        
        // Show/hide Stress Glow Overlay
        if (stressActive) {
            $('#sgc-stress-glow').addClass('active');
        } else {
            $('#sgc-stress-glow').removeClass('active');
        }

        // Setup angle range info cards
        const $ranges = $('#sgc-angle-ranges');
        $ranges.empty();
        $ranges.append(`
            <div class="sgc-info-tile">
                <span class="sgc-tile-lbl">Target Range</span>
                <span class="sgc-tile-val">${config.romRange}</span>
            </div>
            <div class="sgc-info-tile">
                <span class="sgc-tile-lbl">Target Zone</span>
                <span class="sgc-tile-val">${config.optimalAngle}</span>
            </div>
        `);

        // Setup Form Cues
        $('#sgc-form-cue-text').text(isMistake ? config.mistakeCue : config.baseCue);
    }

    function drawSkeleton(coords, isMistake) {
        const svg = document.getElementById('sgc-interactive-svg');
        if (!svg) return;
        
        // Clear all SVG elements except grids
        while (svg.lastChild) {
            svg.removeChild(svg.lastChild);
        }

        // Draw Oscilloscope Grid background
        const gridW = 500;
        const gridH = 400;
        for (let i = 40; i < gridW; i += 40) {
            let line = document.createElementNS("http://www.w3.org/2000/svg", "line");
            line.setAttribute("x1", i);
            line.setAttribute("y1", 0);
            line.setAttribute("x2", i);
            line.setAttribute("y2", gridH);
            line.setAttribute("stroke", "rgba(255,255,255,0.02)");
            svg.appendChild(line);
        }
        for (let j = 40; j < gridH; j += 40) {
            let line = document.createElementNS("http://www.w3.org/2000/svg", "line");
            line.setAttribute("x1", 0);
            line.setAttribute("y1", j);
            line.setAttribute("x2", gridW);
            line.setAttribute("y2", j);
            line.setAttribute("stroke", "rgba(255,255,255,0.02)");
            svg.appendChild(line);
        }

        // Helper functions to create shapes
        function drawLine(p1, p2, color, width, dashed = false) {
            let line = document.createElementNS("http://www.w3.org/2000/svg", "line");
            line.setAttribute("x1", p1.x);
            line.setAttribute("y1", p1.y);
            line.setAttribute("x2", p2.x);
            line.setAttribute("y2", p2.y);
            line.setAttribute("stroke", color);
            line.setAttribute("stroke-width", width);
            line.setAttribute("stroke-linecap", "round");
            if (dashed) {
                line.setAttribute("stroke-dasharray", "4,4");
            }
            svg.appendChild(line);
            return line;
        }

        function drawCircle(pt, radius, fillColor, strokeColor, strokeWidth) {
            let circle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
            circle.setAttribute("cx", pt.x);
            circle.setAttribute("cy", pt.y);
            circle.setAttribute("r", radius);
            circle.setAttribute("fill", fillColor);
            circle.setAttribute("stroke", strokeColor);
            circle.setAttribute("stroke-width", strokeWidth);
            svg.appendChild(circle);
            return circle;
        }

        // Draw floor if lower body exercise
        if (['squat', 'deadlift', 'bicep_curl'].includes(currentEx)) {
            drawLine({ x: 50, y: 350 }, { x: 450, y: 350 }, "rgba(255,255,255,0.1)", 2);
        }
        
        // Draw bench if bench press
        if (currentEx === 'bench') {
            // Legs/stand
            drawLine({ x: 270, y: 230 }, { x: 270, y: 320 }, "rgba(255,255,255,0.15)", 4);
            drawLine({ x: 160, y: 230 }, { x: 160, y: 320 }, "rgba(255,255,255,0.15)", 4);
            // Cushion
            let rect = document.createElementNS("http://www.w3.org/2000/svg", "rect");
            rect.setAttribute("x", 120);
            rect.setAttribute("y", 228);
            rect.setAttribute("width", 240);
            rect.setAttribute("height", 8);
            rect.setAttribute("fill", "#27273a");
            rect.setAttribute("rx", 3);
            svg.appendChild(rect);
        }

        // Color definitions
        const skeletalColor = "rgba(243, 244, 246, 0.9)";
        const jointOuterColor = isMistake ? "rgba(239, 68, 68, 0.4)" : "rgba(6, 182, 212, 0.4)";
        const jointInnerColor = isMistake ? "#ef4444" : "#06b6d4";
        const targetJointGlow = isMistake ? "rgba(239, 68, 68, 0.8)" : "rgba(16, 185, 129, 0.8)";
        
        // DRAW SKELETON SPECIFIC TO EXERCISES
        if (currentEx === 'squat') {
            // Bones
            drawLine(coords.ankle, coords.knee, skeletalColor, 6);
            drawLine(coords.knee, coords.hip, skeletalColor, 6);
            drawLine(coords.hip, coords.shoulder, skeletalColor, 7);
            
            // Draw head
            drawCircle(coords.head, 12, "#18182f", skeletalColor, 2);

            // Draw Barbell load
            drawLine({ x: coords.bar.x - 70, y: coords.bar.y }, { x: coords.bar.x + 70, y: coords.bar.y }, "#9ca3af", 4);
            // Weights (plates)
            let plateColor = isMistake ? "#ef4444" : "#a855f7";
            let rect1 = document.createElementNS("http://www.w3.org/2000/svg", "rect");
            rect1.setAttribute("x", coords.bar.x - 70); rect1.setAttribute("y", coords.bar.y - 20);
            rect1.setAttribute("width", 10); rect1.setAttribute("height", 40); rect1.setAttribute("fill", plateColor);
            rect1.setAttribute("rx", 2); svg.appendChild(rect1);

            let rect2 = document.createElementNS("http://www.w3.org/2000/svg", "rect");
            rect2.setAttribute("x", coords.bar.x + 60); rect2.setAttribute("y", coords.bar.y - 20);
            rect2.setAttribute("width", 10); rect2.setAttribute("height", 40); rect2.setAttribute("fill", plateColor);
            rect2.setAttribute("rx", 2); svg.appendChild(rect2);

            // Joint Node Circles
            drawCircle(coords.ankle, 5, "#1e293b", skeletalColor, 2);
            drawCircle(coords.hip, 6, "#1e293b", skeletalColor, 2);
            
            // Knee Joint (focus point)
            drawCircle(coords.knee, 8, jointOuterColor, jointInnerColor, 2);
            drawCircle(coords.knee, 4, targetJointGlow, targetJointGlow, 0);

            // If Valgus Knee Caving is active, show stress warning arrows
            if (isMistake) {
                let arrowX = coords.knee.x + 25;
                drawLine({ x: arrowX, y: coords.knee.y }, { x: coords.knee.x + 8, y: coords.knee.y }, "#ef4444", 2);
                // Draw simple arrow head
                let poly = document.createElementNS("http://www.w3.org/2000/svg", "polygon");
                poly.setAttribute("points", `${coords.knee.x+8},${coords.knee.y} ${coords.knee.x+15},${coords.knee.y-4} ${coords.knee.x+15},${coords.knee.y+4}`);
                poly.setAttribute("fill", "#ef4444");
                svg.appendChild(poly);

                // Add stress text label
                let text = document.createElementNS("http://www.w3.org/2000/svg", "text");
                text.setAttribute("x", coords.knee.x + 35);
                text.setAttribute("y", coords.knee.y + 4);
                text.setAttribute("fill", "#ef4444");
                text.setAttribute("font-size", "9px");
                text.setAttribute("font-weight", "bold");
                text.textContent = "Knee Valgus Collapse";
                svg.appendChild(text);

                // Spine stress indicator
                let midSpine = { x: (coords.hip.x + coords.shoulder.x)/2, y: (coords.hip.y + coords.shoulder.y)/2 };
                drawCircle(midSpine, 14, "rgba(239, 68, 68, 0.25)", "#ef4444", 1.5);
                let warningText = document.createElementNS("http://www.w3.org/2000/svg", "text");
                warningText.setAttribute("x", midSpine.x + 20);
                warningText.setAttribute("y", midSpine.y - 10);
                warningText.setAttribute("fill", "#ef4444");
                warningText.setAttribute("font-size", "9px");
                warningText.setAttribute("font-weight", "bold");
                warningText.textContent = "Severe Lumbar Shear Force";
                svg.appendChild(warningText);
            }
        } 
        else if (currentEx === 'bench') {
            // Draw Torso
            drawLine(coords.hip, coords.shoulder, skeletalColor, 7);
            drawLine(coords.shoulder, coords.head, skeletalColor, 6);
            
            // Draw Arm bones
            drawLine(coords.shoulder, coords.elbow, skeletalColor, 6);
            drawLine(coords.elbow, coords.wrist, skeletalColor, 5);

            // Draw Barbell load
            drawLine({ x: coords.bar.x, y: coords.bar.y - 70 }, { x: coords.bar.x, y: coords.bar.y + 70 }, "#9ca3af", 4);
            // Plates
            let plateColor = isMistake ? "#ef4444" : "#a855f7";
            let rect1 = document.createElementNS("http://www.w3.org/2000/svg", "rect");
            rect1.setAttribute("x", coords.bar.x - 20); rect1.setAttribute("y", coords.bar.y - 70);
            rect1.setAttribute("width", 40); rect1.setAttribute("height", 10); rect1.setAttribute("fill", plateColor);
            rect1.setAttribute("rx", 2); svg.appendChild(rect1);

            let rect2 = document.createElementNS("http://www.w3.org/2000/svg", "rect");
            rect2.setAttribute("x", coords.bar.x - 20); rect2.setAttribute("y", coords.bar.y + 60);
            rect2.setAttribute("width", 40); rect2.setAttribute("height", 10); rect2.setAttribute("fill", plateColor);
            rect2.setAttribute("rx", 2); svg.appendChild(rect2);

            // Joints
            drawCircle(coords.hip, 5, "#1e293b", skeletalColor, 2);
            drawCircle(coords.shoulder, 6, "#1e293b", skeletalColor, 2);
            drawCircle(coords.wrist, 4, "#1e293b", skeletalColor, 2);

            // Elbow Joint (Focus)
            drawCircle(coords.elbow, 8, jointOuterColor, jointInnerColor, 2);
            drawCircle(coords.elbow, 4, targetJointGlow, targetJointGlow, 0);

            if (isMistake) {
                // Draw flared lines / stress rings at shoulder
                drawCircle(coords.shoulder, 12, "rgba(239,68,68,0.2)", "#ef4444", 1.5);
                let text = document.createElementNS("http://www.w3.org/2000/svg", "text");
                text.setAttribute("x", coords.shoulder.x - 110);
                text.setAttribute("y", coords.shoulder.y - 15);
                text.setAttribute("fill", "#ef4444");
                text.setAttribute("font-size", "9px");
                text.setAttribute("font-weight", "bold");
                text.textContent = "Shoulder Impingement Angle";
                svg.appendChild(text);
            }
        } 
        else if (currentEx === 'deadlift') {
            // Bones
            drawLine(coords.ankle, coords.knee, skeletalColor, 6);
            drawLine(coords.knee, coords.hip, skeletalColor, 6);
            
            // Spine: If rounded, draw quadratic bezier path instead of straight line!
            if (isMistake) {
                let spine = document.createElementNS("http://www.w3.org/2000/svg", "path");
                // Control point pulls upwards to round the back
                let ctrlX = (coords.hip.x + coords.shoulder.x) / 2 - 30;
                let ctrlY = (coords.hip.y + coords.shoulder.y) / 2 - 25;
                spine.setAttribute("d", `M ${coords.hip.x} ${coords.hip.y} Q ${ctrlX} ${ctrlY} ${coords.shoulder.x} ${coords.shoulder.y}`);
                spine.setAttribute("fill", "none");
                spine.setAttribute("stroke", "#ef4444");
                spine.setAttribute("stroke-width", "7");
                spine.setAttribute("stroke-linecap", "round");
                svg.appendChild(spine);
                
                // Stress pulsators
                drawCircle({ x: ctrlX + 10, y: ctrlY + 10 }, 14, "rgba(239,68,68,0.25)", "#ef4444", 1.5);
                
                let warningText = document.createElementNS("http://www.w3.org/2000/svg", "text");
                warningText.setAttribute("x", coords.hip.x + 10);
                warningText.setAttribute("y", coords.hip.y - 45);
                warningText.setAttribute("fill", "#ef4444");
                warningText.setAttribute("font-size", "9px");
                warningText.setAttribute("font-weight", "bold");
                warningText.textContent = "HIGH DISC COMPRESSION";
                svg.appendChild(warningText);
            } else {
                drawLine(coords.hip, coords.shoulder, skeletalColor, 7);
            }

            // Head and Neck
            drawLine(coords.shoulder, coords.head, skeletalColor, 5);
            drawCircle(coords.head, 12, "#18182f", skeletalColor, 2);

            // Arm hanging to bar
            drawLine(coords.shoulder, coords.bar, skeletalColor, 4);

            // Barbell
            drawCircle(coords.bar, 6, "#6b7280", "#4b5563", 1);
            let barPlateColor = isMistake ? "#ef4444" : "#a855f7";
            let rect1 = document.createElementNS("http://www.w3.org/2000/svg", "rect");
            rect1.setAttribute("x", coords.bar.x - 15); rect1.setAttribute("y", coords.bar.y - 40);
            rect1.setAttribute("width", 30); rect1.setAttribute("height", 80); rect1.setAttribute("fill", barPlateColor);
            rect1.setAttribute("rx", 3); svg.appendChild(rect1);

            // Joints
            drawCircle(coords.ankle, 5, "#1e293b", skeletalColor, 2);
            drawCircle(coords.knee, 6, "#1e293b", skeletalColor, 2);
            drawCircle(coords.shoulder, 5, "#1e293b", skeletalColor, 2);

            // Hip Joint (focus)
            drawCircle(coords.hip, 8, jointOuterColor, jointInnerColor, 2);
            drawCircle(coords.hip, 4, targetJointGlow, targetJointGlow, 0);
        } 
        else if (currentEx === 'bicep_curl') {
            // Legs/Torso (static standing posture)
            drawLine(coords.ankle, coords.knee, skeletalColor, 6);
            drawLine(coords.knee, coords.hip, skeletalColor, 6);
            drawLine(coords.hip, coords.shoulder, skeletalColor, 7);
            drawCircle(coords.head, 12, "#18182f", skeletalColor, 2);

            // Arms
            drawLine(coords.shoulder, coords.elbow, skeletalColor, 6);
            drawLine(coords.elbow, coords.wrist, skeletalColor, 5);

            // Dumbbell
            drawLine({ x: coords.dumbbell.x - 18, y: coords.dumbbell.y }, { x: coords.dumbbell.x + 18, y: coords.dumbbell.y }, "#9ca3af", 3);
            let dbColor = "#4b5563";
            drawCircle({ x: coords.dumbbell.x - 18, y: coords.dumbbell.y }, 10, dbColor, "#222", 1);
            drawCircle({ x: coords.dumbbell.x + 18, y: coords.dumbbell.y }, 10, dbColor, "#222", 1);

            // Joints
            drawCircle(coords.ankle, 5, "#1e293b", skeletalColor, 2);
            drawCircle(coords.hip, 6, "#1e293b", skeletalColor, 2);
            drawCircle(coords.shoulder, 6, "#1e293b", skeletalColor, 2);
            drawCircle(coords.wrist, 4, "#1e293b", skeletalColor, 2);

            // Elbow Joint (Focus)
            drawCircle(coords.elbow, 8, jointOuterColor, jointInnerColor, 2);
            drawCircle(coords.elbow, 4, targetJointGlow, targetJointGlow, 0);

            if (isMistake) {
                // Highlight cheating movement showing elbow path drift
                let oldElbow = { x: 260, y: 180 };
                drawLine(oldElbow, coords.elbow, "#ef4444", 2, true);
                
                let text = document.createElementNS("http://www.w3.org/2000/svg", "text");
                text.setAttribute("x", coords.elbow.x - 120);
                text.setAttribute("y", coords.elbow.y + 20);
                text.setAttribute("fill", "#ef4444");
                text.setAttribute("font-size", "9px");
                text.setAttribute("font-weight", "bold");
                text.textContent = "Elbow Sway (Deactivates Bicep)";
                svg.appendChild(text);
            }
        }
        else if (currentEx === 'ohp') {
            // Legs/Torso standing
            drawLine(coords.ankle, coords.knee, skeletalColor, 6);
            drawLine(coords.knee, coords.hip, skeletalColor, 6);
            
            // Draw spine: if mistake is active, draw a curved spine to show layback/lordosis
            if (isMistake) {
                let spine = document.createElementNS("http://www.w3.org/2000/svg", "path");
                let ctrlX = (coords.hip.x + coords.shoulder.x) / 2 + 15; // arch back
                let ctrlY = (coords.hip.y + coords.shoulder.y) / 2;
                spine.setAttribute("d", `M ${coords.hip.x} ${coords.hip.y} Q ${ctrlX} ${ctrlY} ${coords.shoulder.x} ${coords.shoulder.y}`);
                spine.setAttribute("fill", "none");
                spine.setAttribute("stroke", "#ef4444");
                spine.setAttribute("stroke-width", "7");
                spine.setAttribute("stroke-linecap", "round");
                svg.appendChild(spine);
                
                // Stress bubble around lower spine
                drawCircle({ x: ctrlX - 5, y: ctrlY + 10 }, 14, "rgba(239, 68, 68, 0.25)", "#ef4444", 1.5);
                
                let warningText = document.createElementNS("http://www.w3.org/2000/svg", "text");
                warningText.setAttribute("x", coords.hip.x - 130);
                warningText.setAttribute("y", coords.hip.y - 10);
                warningText.setAttribute("fill", "#ef4444");
                warningText.setAttribute("font-size", "9px");
                warningText.setAttribute("font-weight", "bold");
                warningText.textContent = "HIGH LUMBAR SHEAR PRESSURE";
                svg.appendChild(warningText);
            } else {
                drawLine(coords.hip, coords.shoulder, skeletalColor, 7);
            }
            
            drawLine(coords.shoulder, coords.head, skeletalColor, 5);
            drawCircle(coords.head, 12, "#18182f", skeletalColor, 2);
            
            // Arm joints
            drawLine(coords.shoulder, coords.elbow, skeletalColor, 6);
            drawLine(coords.elbow, coords.wrist, skeletalColor, 5);
            
            // Barbell (resting at collarbone or locked out)
            drawLine({ x: coords.bar.x - 70, y: coords.bar.y }, { x: coords.bar.x + 70, y: coords.bar.y }, "#9ca3af", 4);
            let barPlateColor = isMistake ? "#ef4444" : "#ff6b2b";
            let rect1 = document.createElementNS("http://www.w3.org/2000/svg", "rect");
            rect1.setAttribute("x", coords.bar.x - 70); rect1.setAttribute("y", coords.bar.y - 20);
            rect1.setAttribute("width", 10); rect1.setAttribute("height", 40); rect1.setAttribute("fill", barPlateColor);
            rect1.setAttribute("rx", 2); svg.appendChild(rect1);

            let rect2 = document.createElementNS("http://www.w3.org/2000/svg", "rect");
            rect2.setAttribute("x", coords.bar.x + 60); rect2.setAttribute("y", coords.bar.y - 20);
            rect2.setAttribute("width", 10); rect2.setAttribute("height", 40); rect2.setAttribute("fill", barPlateColor);
            rect2.setAttribute("rx", 2); svg.appendChild(rect2);
            
            // Joint nodes
            drawCircle(coords.ankle, 5, "#1e293b", skeletalColor, 2);
            drawCircle(coords.knee, 6, "#1e293b", skeletalColor, 2);
            drawCircle(coords.shoulder, 6, "#1e293b", skeletalColor, 2);
            drawCircle(coords.wrist, 4, "#1e293b", skeletalColor, 2);
            
            // Elbow Joint focus
            drawCircle(coords.elbow, 8, jointOuterColor, jointInnerColor, 2);
            drawCircle(coords.elbow, 4, targetJointGlow, targetJointGlow, 0);
        }
        else if (currentEx === 'row') {
            // Legs standing soft knee
            drawLine(coords.ankle, coords.knee, skeletalColor, 6);
            drawLine(coords.knee, coords.hip, skeletalColor, 6);
            
            // Spine
            drawLine(coords.hip, coords.shoulder, skeletalColor, 7);
            drawLine(coords.shoulder, coords.head, skeletalColor, 5);
            drawCircle(coords.head, 12, "#18182f", skeletalColor, 2);
            
            // Arms
            drawLine(coords.shoulder, coords.elbow, skeletalColor, 6);
            drawLine(coords.elbow, coords.wrist, skeletalColor, 5);
            
            // Barbell hanging or pulled up
            drawCircle(coords.bar, 6, "#6b7280", "#4b5563", 1);
            let barPlateColor = isMistake ? "#ef4444" : "#ff6b2b";
            let rect1 = document.createElementNS("http://www.w3.org/2000/svg", "rect");
            rect1.setAttribute("x", coords.bar.x - 15); rect1.setAttribute("y", coords.bar.y - 40);
            rect1.setAttribute("width", 30); rect1.setAttribute("height", 80); rect1.setAttribute("fill", barPlateColor);
            rect1.setAttribute("rx", 3); svg.appendChild(rect1);
            
            // Joints
            drawCircle(coords.ankle, 5, "#1e293b", skeletalColor, 2);
            drawCircle(coords.knee, 6, "#1e293b", skeletalColor, 2);
            drawCircle(coords.shoulder, 6, "#1e293b", skeletalColor, 2);
            drawCircle(coords.wrist, 4, "#1e293b", skeletalColor, 2);
            
            // Elbow joint focus
            drawCircle(coords.elbow, 8, jointOuterColor, jointInnerColor, 2);
            drawCircle(coords.elbow, 4, targetJointGlow, targetJointGlow, 0);
            
            if (isMistake) {
                // Highlight shoulder/trap stress and bad vertical angle
                drawCircle(coords.shoulder, 12, "rgba(239, 68, 68, 0.25)", "#ef4444", 1.5);
                let warningText = document.createElementNS("http://www.w3.org/2000/svg", "text");
                warningText.setAttribute("x", coords.shoulder.x + 20);
                warningText.setAttribute("y", coords.shoulder.y - 10);
                warningText.setAttribute("fill", "#ef4444");
                warningText.setAttribute("font-size", "9px");
                warningText.setAttribute("font-weight", "bold");
                warningText.textContent = "UPRIGHT SHRUGGING (Trap Dominance)";
                svg.appendChild(warningText);
            }
        }
        else if (currentEx === 'leg_raise') {
            // Draw floor
            drawLine({ x: 50, y: 340 }, { x: 450, y: 340 }, "rgba(255,255,255,0.2)", 3);
            
            // Draw Head, shoulder, hip lying flat
            drawLine(coords.head, coords.shoulder, skeletalColor, 6);
            
            // Spine: if mistake, arch lower back off floor (represented by bezier curve)
            if (isMistake) {
                let spine = document.createElementNS("http://www.w3.org/2000/svg", "path");
                let ctrlX = (coords.shoulder.x + coords.hip.x) / 2;
                let ctrlY = 315; // arched upwards, floor is 335
                spine.setAttribute("d", `M ${coords.shoulder.x} 335 Q ${ctrlX} ${ctrlY} ${coords.hip.x} 335`);
                spine.setAttribute("fill", "none");
                spine.setAttribute("stroke", "#ef4444");
                spine.setAttribute("stroke-width", "7");
                spine.setAttribute("stroke-linecap", "round");
                svg.appendChild(spine);
                
                // Gap highlights under arched back
                let gapArc = document.createElementNS("http://www.w3.org/2000/svg", "path");
                gapArc.setAttribute("d", `M ${coords.shoulder.x + 20} 335 Q ${ctrlX} 323 ${coords.hip.x - 20} 335`);
                gapArc.setAttribute("fill", "rgba(239, 68, 68, 0.15)");
                gapArc.setAttribute("stroke", "rgba(239, 68, 68, 0.4)");
                gapArc.setAttribute("stroke-width", "1");
                gapArc.setAttribute("stroke-dasharray", "2,2");
                svg.appendChild(gapArc);
                
                let warningText = document.createElementNS("http://www.w3.org/2000/svg", "text");
                warningText.setAttribute("x", coords.shoulder.x + 10);
                warningText.setAttribute("y", 295);
                warningText.setAttribute("fill", "#ef4444");
                warningText.setAttribute("font-size", "9px");
                warningText.setAttribute("font-weight", "bold");
                warningText.textContent = "LUMBAR ARCHING (Abs Disengaged)";
                svg.appendChild(warningText);
            } else {
                drawLine(coords.shoulder, coords.hip, skeletalColor, 7);
            }
            
            // Draw legs: Hip-Knee-Ankle
            drawLine(coords.hip, coords.knee, skeletalColor, 6);
            drawLine(coords.knee, coords.ankle, skeletalColor, 6);
            
            drawCircle(coords.head, 12, "#18182f", skeletalColor, 2);
            
            // Joint nodes
            drawCircle(coords.shoulder, 6, "#1e293b", skeletalColor, 2);
            drawCircle(coords.knee, 5, "#1e293b", skeletalColor, 2);
            drawCircle(coords.ankle, 4, "#1e293b", skeletalColor, 2);
            
            // Hip Joint focus
            drawCircle(coords.hip, 8, jointOuterColor, jointInnerColor, 2);
            drawCircle(coords.hip, 4, targetJointGlow, targetJointGlow, 0);
        }
    }

    // ==========================================================================
    // NUTRITION & PROTEIN CALCULATOR ENGINE
    // ==========================================================================
    function initCalculator() {
        $('#sgc-calc-btn').on('click', function(e) {
            e.preventDefault();
            calculateNutrition();
        });

        // Meal buttons toggle
        $('.sgc-meal-btn').on('click', function() {
            $('.sgc-meal-btn').removeClass('active');
            $(this).addClass('active');
            updateMealPlan();
        });

        // Run default profile calculation on load
        calculateNutrition();
    }

    let globalTargetCalories = 2000;
    let globalTargetProtein = 150;

    function calculateNutrition() {
        // Fetch raw inputs
        const gender = $('#sgc-gender').val();
        const age = parseInt($('#sgc-age').val());
        const activity = parseFloat($('#sgc-activity').val());
        const goal = $('#sgc-goal').val();
        const dietType = $('#sgc-diet-type').val();
        
        let weight = parseFloat($('#sgc-weight').val());
        const weightUnit = $('#sgc-weight-unit').val();
        let height = parseFloat($('#sgc-height').val());
        const heightUnit = $('#sgc-height-unit').val();

        // Validate values
        if (isNaN(age) || isNaN(weight) || isNaN(height)) {
            alert("Please fill in valid numerical values.");
            return;
        }

        // Convert units to metric (kg and cm) for formula uniformity
        if (weightUnit === 'lbs') {
            weight = weight * 0.453592; // lbs to kg
        }
        if (heightUnit === 'in') {
            height = height * 2.54; // inches to cm
        }

        // Mifflin-St Jeor Equation
        let bmr = 0;
        if (gender === 'male') {
            bmr = (10 * weight) + (6.25 * height) - (5 * age) + 5;
        } else {
            bmr = (10 * weight) + (6.25 * height) - (5 * age) - 161;
        }

        // TDEE (Total Daily Energy Expenditure)
        let tdee = bmr * activity;

        // Caloric Target adjustments based on goals
        let targetCalories = tdee;
        let proteinRatioGrams = 2.0; // Base: 2g protein per kg

        if (goal === 'lose') {
            targetCalories = tdee - 500; // Deficit
            proteinRatioGrams = 2.3; // Higher protein retention on cuts
            // Safe minimum calorie barrier
            if (targetCalories < bmr) {
                targetCalories = bmr;
            }
        } else if (goal === 'build') {
            targetCalories = tdee + 300; // Surplus
            proteinRatioGrams = 2.1; // Moderate building ratio
        } else {
            proteinRatioGrams = 1.8; // Maintenance ratio
        }

        targetCalories = Math.round(targetCalories);
        bmr = Math.round(bmr);
        tdee = Math.round(tdee);

        // Store globally for meals distribution
        globalTargetCalories = targetCalories;

        // Calculate Protein in grams
        let proteinGrams = Math.round(weight * proteinRatioGrams);
        let proteinCalories = proteinGrams * 4;
        
        // Ensure protein does not consume excessive amount of calories
        if (proteinCalories > targetCalories * 0.45) {
            proteinGrams = Math.round((targetCalories * 0.35) / 4);
            proteinCalories = proteinGrams * 4;
        }

        globalTargetProtein = proteinGrams;

        // Remaining calories partition (Fats vs Carbs)
        let fatPercentage = 0.30; // Balanced default
        let carbPercentage = 0.40;

        if (dietType === 'high-protein') {
            // Re-allocate if high protein selection overrides
            let forcedProteinPercentage = 0.40;
            proteinGrams = Math.round((targetCalories * forcedProteinPercentage) / 4);
            proteinCalories = proteinGrams * 4;
            globalTargetProtein = proteinGrams;
            
            fatPercentage = 0.25;
            carbPercentage = 0.35;
        } else if (dietType === 'low-carb') {
            fatPercentage = 0.50;
            carbPercentage = 0.15;
            let forcedProteinPercentage = 0.35;
            proteinGrams = Math.round((targetCalories * forcedProteinPercentage) / 4);
            proteinCalories = proteinGrams * 4;
            globalTargetProtein = proteinGrams;
        }

        let fatCalories = targetCalories * fatPercentage;
        let fatGrams = Math.round(fatCalories / 9);

        let carbCalories = targetCalories - proteinCalories - fatCalories;
        if (carbCalories < 0) carbCalories = 0;
        let carbGrams = Math.round(carbCalories / 4);

        // Water intake (Bases: 35ml per kg + 500ml for activity)
        let waterLiters = (weight * 0.035) + 0.5;
        waterLiters = waterLiters.toFixed(1);

        // Creatine Monohydrate dosages (loading: 0.3g/kg, maintenance: 0.04g/kg)
        let creatineLoad = Math.round(weight * 0.3);
        // Cap loading phase at 25g/day for gastric comfort
        creatineLoad = Math.min(25, Math.max(15, creatineLoad));
        
        let creatineMaint = Math.round(weight * 0.05);
        creatineMaint = Math.min(10, Math.max(3, creatineMaint));

        // RENDER OUTPUTS TO INTERFACE
        $('#sgc-res-bmr').text(bmr);
        $('#sgc-res-tdee').text(tdee);
        $('#sgc-res-target').text(targetCalories);

        // Grams labels
        $('#sgc-protein-grams').text(`${proteinGrams}g`);
        $('#sgc-carbs-grams').text(`${carbGrams}g`);
        $('#sgc-fats-grams').text(`${fatGrams}g`);

        // Calories labels
        $('#sgc-protein-kcals').text(`${proteinCalories} kcal`);
        $('#sgc-carbs-kcals').text(`${Math.round(carbCalories)} kcal`);
        $('#sgc-fats-kcals').text(`${Math.round(fatCalories)} kcal`);

        // Rings Progress values
        // We calculate percentage relative to total calories for visual representation
        let protPct = Math.round((proteinCalories / targetCalories) * 100);
        let carbPct = Math.round((carbCalories / targetCalories) * 100);
        let fatPct = Math.round((fatCalories / targetCalories) * 100);

        setCirclePercentage('sgc-protein-ring', protPct);
        setCirclePercentage('sgc-carbs-ring', carbPct);
        setCirclePercentage('sgc-fats-ring', fatPct);

        // Support guides
        $('#sgc-res-water').text(`${waterLiters} Liters`);
        $('#sgc-creatine-load').text(creatineLoad);
        $('#sgc-creatine-maint').text(creatineMaint);

        // Populate meal splits
        updateMealPlan();
    }

    function setCirclePercentage(elementId, percent) {
        const circle = document.getElementById(elementId);
        if (!circle) return;
        
        // SVG circle perimeter is 100 (due to radius 15.9155 inside 36x36 viewbox)
        // stroke-dasharray format: "filled_portion, total_perimeter"
        circle.setAttribute('stroke-dasharray', `${percent}, 100`);
    }

    function updateMealPlan() {
        const mealsCount = parseInt($('.sgc-meal-btn.active').data('meals'));
        const $mealContainer = $('#sgc-meal-breakdown-list');
        $mealContainer.empty();

        const caloriePerMeal = Math.round(globalTargetCalories / mealsCount);
        const proteinPerMeal = Math.round(globalTargetProtein / mealsCount);

        const mealSuggestions = {
            3: [
                { name: "Breakfast Power Bowl", foods: "3 whole eggs, 100g oatmeal, 30g whey protein scoop, berries." },
                { name: "Post-Workout Lunch", foods: "150g grilled chicken breast, 150g cooked jasmine rice, steamed broccoli." },
                { name: "Anabolic Dinner Feast", foods: "180g lean beef mince, 200g sweet potato mash, mixed green salad with olive oil." }
            ],
            4: [
                { name: "Breakfast Energy Kick", foods: "4 egg whites + 2 whole eggs, 2 slices wholewheat toast, avocado." },
                { name: "Lean Lunch Plate", foods: "140g turkey breast fillet, 130g basmati rice, green beans." },
                { name: "Hypertrophy Mid-day Shake", foods: "35g whey isolate, 1 banana, 30g peanut butter, 300ml almond milk." },
                { name: "Restorative Dinner", foods: "160g salmon fillet, quinoa salad, baked asparagus." }
            ],
            5: [
                { name: "Sunrise Feeding", foods: "150g low-fat Greek yogurt, 30g whey protein, almonds, chia seeds." },
                { name: "Mid-Morning Fuel", foods: "120g shredded chicken breast, 120g sweet potato." },
                { name: "Mid-day Training Fuel", foods: "130g canned tuna flakes, 3 rice cakes, 1 apple." },
                { name: "Anabolic Window Shake", foods: "35g whey protein isolate, 50g cream of rice." },
                { name: "Bedtime Casein Build", foods: "200g cottage cheese (or casein powder), 15g peanut butter." }
            ]
        };

        const suggestions = mealSuggestions[mealsCount];

        for (let i = 0; i < mealsCount; i++) {
            const meal = suggestions[i] || { name: `Meal Feed ${i+1}`, foods: "Balanced serving of complex carbs, clean protein and healthy fats." };
            
            const cardHtml = `
                <div class="sgc-meal-card">
                    <div>
                        <span class="sgc-meal-name">${meal.name}</span>
                        <p class="sgc-meal-summary">${meal.foods}</p>
                    </div>
                    <div class="sgc-meal-macros">
                        <span class="sgc-meal-prot">${proteinPerMeal}g Protein</span>
                        <p class="sgc-meal-kcal">${caloriePerMeal} kcal</p>
                    </div>
                </div>
            `;
            $mealContainer.append(cardHtml);
        }
    }

    // ==========================================================================
    // PROGRESSIVE OVERLOAD PLAYBOOK
    // ==========================================================================
    function initPlaybook() {
        const overloadDescriptions = {
            1: {
                title: "Week 1: Adaptive Baseline",
                desc: "You lift a comfortable base weight (e.g. 45 lbs). Your body easily matches this load without needing to build new muscle fibers since the mechanical tension is well within its current capacity.",
                emoji: "💪",
                plates: ["p45"]
            },
            2: {
                title: "Week 2: Initial Stimulus Overload",
                desc: "You increase the weight slightly (e.g. 55 lbs). This introduces microscopic tears (microtrauma) to the sarcomeres, signaling the nervous system to synthesize additional myofibrillar proteins.",
                emoji: "💪🏽",
                plates: ["p45", "p5"]
            },
            3: {
                title: "Week 3: Adaptive Progression",
                desc: "Weight increased to 65 lbs. Under regular feeding (protein) and deep sleep, satellite cells fuse to damaged muscle fibers, creating thicker, denser, and stronger muscles.",
                emoji: "🔥",
                plates: ["p45", "p10"]
            },
            4: {
                title: "Week 4: Advanced Muscle Hypertrophy",
                desc: "Weight is now 75 lbs. The muscle tissue has adapted, visibly thickening to tolerate the intense load. Systemic motor-unit recruitment has improved, and core stabilization is locked in.",
                emoji: "🦁",
                plates: ["p45", "p10", "p5"]
            },
            5: {
                title: "Week 5: Absolute Peak Adaption",
                desc: "Weight is now 95 lbs. Muscle cross-sectional area has expanded. The nervous system has adapted to handle near double the starting load with stable technique. Real gains locked in!",
                emoji: "🦍",
                plates: ["p45", "p25"]
            }
        };

        $('#sgc-overload-slider').on('input', function() {
            const val = parseInt($(this).val());
            const data = overloadDescriptions[val];

            // Update text description
            $('#sgc-overload-status-title').text(data.title);
            $('#sgc-overload-status-desc').text(data.desc);

            // Morph emoji scale to represent muscle growth
            const scaleFactor = 1 + (val - 1) * 0.15; // 1.0 to 1.6 scale
            $('#sgc-muscle-demo-size')
                .text(data.emoji)
                .css('transform', `scale(${scaleFactor})`);

            // Re-render barbell plates stack dynamically
            const $stack = $('#sgc-weight-plate-stack');
            $stack.empty();
            
            // Render plates from bottom to top (heaviest bottom)
            data.plates.forEach(function(plateClass) {
                $stack.prepend(`<div class="sgc-plate ${plateClass}"></div>`);
            });

            // Calculate total weight label (45 lbs bar + plates * 2 side)
            let totalWeight = 45;
            if (val === 2) totalWeight = 55;
            if (val === 3) totalWeight = 65;
            if (val === 4) totalWeight = 75;
            if (val === 5) totalWeight = 95;

            $('#sgc-weight-demo-val').text(`${totalWeight} lbs`);
        });

        // Trigger initial slider render
        $('#sgc-overload-slider').trigger('input');
    }

})(jQuery);
