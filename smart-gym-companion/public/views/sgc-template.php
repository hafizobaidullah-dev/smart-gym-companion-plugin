<?php
/**
 * Template for the Smart Gym Companion Dashboard.
 */

if ( ! defined( 'ABSPATH' ) ) {
    exit;
}
?>

<div id="sgc-container" class="sgc-wrap sgc-dark">
    <!-- Header -->
    <header class="sgc-header">
        <div class="sgc-logo-area">
            <span class="sgc-logo-glow"></span>
            <div class="sgc-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="m6.5 6.5 11 11M21 21l-3-3M3 3l3 3M18.5 5.5l-3 3M5.5 18.5l3-3M8.5 2h7M8.5 22h7"/></svg>
            </div>
            <div>
                <h1>AURA <span class="sgc-accent-text">FIT</span></h1>
                <p class="sgc-subtitle">Smart Posture & Nutrition Bio-Companion</p>
            </div>
        </div>
        <div class="sgc-status-bar">
            <span class="sgc-badge"><span class="sgc-pulse-dot"></span> Beginner Mode Active</span>
            <span class="sgc-badge-version">v1.0.0-PRO</span>
        </div>
    </header>

    <!-- Navigation Tabs -->
    <nav class="sgc-tabs">
        <button class="sgc-tab-btn active" data-tab="muscle-map">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="18" height="18" x="3" y="3" rx="2"/><path d="M9 3v18M15 3v18M3 9h18M3 15h18"/></svg>
            <span>Muscle Target Map</span>
        </button>
        <button class="sgc-tab-btn" data-tab="posture-visualizer">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M8 12h8M12 8v8"/></svg>
            <span>Joint Angle Visualizer</span>
        </button>
        <button class="sgc-tab-btn" data-tab="macro-calc">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>
            <span>Protein & Macros</span>
        </button>
        <button class="sgc-tab-btn" data-tab="gym-playbook">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1-2.5-2.5Z"/><path d="M6 6h10M6 10h10"/></svg>
            <span>Beginner Playbook</span>
        </button>
    </nav>

    <!-- Main Content Container -->
    <main class="sgc-content">

        <!-- TAB 1: MUSCLE TARGET MAP -->
        <section id="sgc-tab-muscle-map" class="sgc-tab-content active">
            <div class="sgc-grid-2col">
                <!-- Visual Muscle Model (Futuristic Schematic Map) -->
                <div class="sgc-card sgc-glassmorphism sgc-map-card">
                    <div class="sgc-card-header">
                        <h3>Interactive Anatomy Interface</h3>
                        <div class="sgc-toggle-group">
                            <button id="sgc-body-front-btn" class="sgc-toggle-btn active">Front View</button>
                            <button id="sgc-body-back-btn" class="sgc-toggle-btn">Back View</button>
                        </div>
                    </div>
                    
                    <div class="sgc-anatomy-container">
                        <!-- FRONT BODY MAP -->
                        <div id="sgc-anatomy-front" class="sgc-anatomy-view active">
                            <svg id="sgc-svg-front" viewBox="0 0 300 500" class="sgc-anatomy-svg">
                                <defs>
                                    <linearGradient id="bodyGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                                        <stop offset="0%" stop-color="#1e1e38" />
                                        <stop offset="100%" stop-color="#0f0f1b" />
                                    </linearGradient>
                                </defs>
                                <!-- Silhouette Background -->
                                <path d="M150,40 C165,40 170,55 170,65 C170,75 162,80 162,90 C162,95 180,100 195,115 C210,130 220,160 225,190 C228,210 215,220 205,210 C198,203 195,190 195,180 L190,260 L200,320 L195,380 L185,470 L150,470 L150,310 L150,470 L115,470 L105,380 L100,320 L110,260 L105,180 C105,190 102,203 95,210 C85,220 72,210 75,190 C80,160 90,130 105,115 C120,100 138,95 138,90 C138,80 130,75 130,65 C130,55 135,40 150,40 Z" fill="url(#bodyGrad)" stroke="#3b3b6d" stroke-width="1.5" />
                                
                                <!-- Head and Neck -->
                                <circle cx="150" cy="55" r="15" class="sgc-muscle" data-muscle="neck" />
                                
                                <!-- Shoulders / Delts -->
                                <path d="M110,105 C100,110 98,125 102,135 C105,140 112,130 115,125 C118,120 120,110 110,105 Z" class="sgc-muscle" data-muscle="shoulders" />
                                <path d="M190,105 C200,110 202,125 198,135 C195,140 188,130 185,125 C182,120 180,110 190,105 Z" class="sgc-muscle" data-muscle="shoulders" />
                                
                                <!-- Chest / Pectorals -->
                                <path d="M120,122 C135,120 148,123 150,132 C150,132 150,150 145,155 C135,155 125,150 120,140 Z" class="sgc-muscle" data-muscle="chest" />
                                <path d="M180,122 C165,120 152,123 150,132 C150,132 150,150 155,155 C165,155 175,150 180,140 Z" class="sgc-muscle" data-muscle="chest" />
                                
                                <!-- Biceps / Arms Front -->
                                <path d="M96,138 C90,145 88,160 92,175 C95,175 100,165 102,158 C104,150 102,142 96,138 Z" class="sgc-muscle" data-muscle="arms" />
                                <path d="M204,138 C210,145 212,160 208,175 C205,175 200,165 198,158 C196,150 198,142 204,138 Z" class="sgc-muscle" data-muscle="arms" />
                                
                                <!-- Core / Abdominals -->
                                <rect x="135" y="160" width="30" height="60" rx="4" class="sgc-muscle" data-muscle="abs" />
                                
                                <!-- Forearms -->
                                <path d="M88,180 C82,192 78,205 84,212 C88,210 92,200 93,190 Z" class="sgc-muscle" data-muscle="forearms" />
                                <path d="M212,180 C218,192 222,205 216,212 C212,210 208,200 207,190 Z" class="sgc-muscle" data-muscle="forearms" />

                                <!-- Quadriceps (Thighs) -->
                                <path d="M112,265 C110,295 115,345 125,360 C132,360 135,335 138,300 C140,275 132,260 112,265 Z" class="sgc-muscle" data-muscle="quads" />
                                <path d="M188,265 C190,295 185,345 175,360 C168,360 165,335 162,300 C160,275 168,260 188,265 Z" class="sgc-muscle" data-muscle="quads" />
                                
                                <!-- Calves Front -->
                                <path d="M113,385 C108,405 112,440 118,450 C122,440 125,415 122,390 Z" class="sgc-muscle" data-muscle="calves" />
                                <path d="M187,385 C192,405 188,440 182,450 C178,440 175,415 178,390 Z" class="sgc-muscle" data-muscle="calves" />
                            </svg>
                        </div>

                        <!-- BACK BODY MAP -->
                        <div id="sgc-anatomy-back" class="sgc-anatomy-view">
                            <svg id="sgc-svg-back" viewBox="0 0 300 500" class="sgc-anatomy-svg">
                                <!-- Silhouette Background -->
                                <path d="M150,40 C165,40 170,55 170,65 C170,75 162,80 162,90 C162,95 180,100 195,115 C210,130 220,160 225,190 C228,210 215,220 205,210 C198,203 195,190 195,180 L190,260 L200,320 L195,380 L185,470 L150,470 L150,310 L150,470 L115,470 L105,380 L100,320 L110,260 L105,180 C105,190 102,203 95,210 C85,220 72,210 75,190 C80,160 90,130 105,115 C120,100 138,95 138,90 C138,80 130,75 130,65 C130,55 135,40 150,40 Z" fill="url(#bodyGrad)" stroke="#3b3b6d" stroke-width="1.5" />
                                
                                <!-- Upper Back / Traps -->
                                <path d="M132,95 C142,100 158,100 168,95 C175,112 165,120 150,125 C135,120 125,112 132,95 Z" class="sgc-muscle" data-muscle="back" />
                                
                                <!-- Lats / Mid Back -->
                                <path d="M122,128 C135,130 148,135 150,145 C150,145 138,185 132,190 C120,185 115,160 122,128 Z" class="sgc-muscle" data-muscle="back" />
                                <path d="M178,128 C165,130 152,135 150,145 C150,145 162,185 168,190 C180,185 185,160 178,128 Z" class="sgc-muscle" data-muscle="back" />

                                <!-- Lower Back -->
                                <rect x="138" y="195" width="24" height="30" rx="3" class="sgc-muscle" data-muscle="lowerback" />
                                
                                <!-- Triceps / Back Arms -->
                                <path d="M96,138 C90,145 88,160 92,175 C95,175 100,165 102,158 C104,150 102,142 96,138 Z" class="sgc-muscle" data-muscle="triceps" />
                                <path d="M204,138 C210,145 212,160 208,175 C205,175 200,165 198,158 C196,150 198,142 204,138 Z" class="sgc-muscle" data-muscle="triceps" />
                                
                                <!-- Glutes (Buttocks) -->
                                <path d="M112,250 C125,245 145,250 150,265 C150,285 130,295 112,290 C108,275 108,255 112,250 Z" class="sgc-muscle" data-muscle="glutes" />
                                <path d="M188,250 C175,245 155,250 150,265 C150,285 170,295 188,290 C192,275 192,255 188,250 Z" class="sgc-muscle" data-muscle="glutes" />
                                
                                <!-- Hamstrings (Back Thighs) -->
                                <path d="M112,298 C110,315 115,350 126,365 C132,365 138,340 136,315 C135,300 125,295 112,298 Z" class="sgc-muscle" data-muscle="hamstrings" />
                                <path d="M188,298 C190,315 185,350 174,365 C168,365 162,340 164,315 C165,300 175,295 188,298 Z" class="sgc-muscle" data-muscle="hamstrings" />
                                
                                <!-- Calves Back -->
                                <path d="M110,385 C102,405 108,440 116,450 C122,440 124,415 120,390 Z" class="sgc-muscle" data-muscle="calves" />
                                <path d="M190,385 C198,405 192,440 184,450 C178,440 176,415 180,390 Z" class="sgc-muscle" data-muscle="calves" />
                            </svg>
                        </div>
                    </div>
                    <div class="sgc-map-tip">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4M12 8h.01"/></svg>
                        <span>Hover or tap a muscle group to view exercise guides and details.</span>
                    </div>
                </div>

                <!-- Info Panel -->
                <div class="sgc-card sgc-glassmorphism sgc-info-card">
                    <div id="sgc-muscle-default-view" class="sgc-muscle-panel active">
                        <div class="sgc-welcome-graphic">
                            <svg width="60" height="60" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect width="18" height="18" x="3" y="3" rx="2"/><path d="M12 8v8M8 12h8"/></svg>
                        </div>
                        <h3>Bio-Anatomical Selector</h3>
                        <p class="sgc-lead">Select any muscle group on the holographic model to reveal the target exercises, optimal biomechanics, and set-rep protocols.</p>
                        <div class="sgc-quick-links">
                            <span class="sgc-ql-title">Quick Targets:</span>
                            <div class="sgc-ql-buttons">
                                <button class="sgc-mini-btn" data-target-muscle="chest">Chest</button>
                                <button class="sgc-mini-btn" data-target-muscle="back">Back</button>
                                <button class="sgc-mini-btn" data-target-muscle="quads">Quads</button>
                                <button class="sgc-mini-btn" data-target-muscle="arms">Arms</button>
                                <button class="sgc-mini-btn" data-target-muscle="abs">Core</button>
                            </div>
                        </div>
                    </div>

                    <div id="sgc-muscle-detail-view" class="sgc-muscle-panel">
                        <div class="sgc-muscle-header">
                            <span id="sgc-muscle-category" class="sgc-meta-tag">Compound Target</span>
                            <h2 id="sgc-muscle-title">Quadriceps</h2>
                            <p id="sgc-muscle-desc">The primary muscle group on the front of your thigh, responsible for knee extension and vital for compound power.</p>
                        </div>
                        
                        <div class="sgc-detail-section">
                            <h4>Target Exercises & Protocols</h4>
                            <div id="sgc-exercise-list" class="sgc-exercise-stack">
                                <!-- Dynamically populated -->
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <!-- TAB 2: POSTURE & ANGLE VISUALIZER -->
        <section id="sgc-tab-posture-visualizer" class="sgc-tab-content">
            <div class="sgc-grid-visualizer">
                <!-- Select Exercise Side Panel -->
                <div class="sgc-card sgc-glassmorphism sgc-visualizer-menu">
                    <h3>Exercises</h3>
                    <p class="sgc-card-sub">Select a movement to inspect joint mechanics:</p>
                    <div class="sgc-exercise-selector-list">
                        <button class="sgc-ex-select-btn active" data-ex="squat">
                            <span class="sgc-ex-icon">🏋️‍♂️</span>
                            <div class="sgc-ex-details">
                                <span class="sgc-ex-name">Barbell Squat</span>
                                <span class="sgc-ex-meta">Knee & Hip Angle</span>
                            </div>
                        </button>
                        <button class="sgc-ex-select-btn" data-ex="bench">
                            <span class="sgc-ex-icon">🏋️</span>
                            <div class="sgc-ex-details">
                                <span class="sgc-ex-name">Bench Press</span>
                                <span class="sgc-ex-meta">Elbow & Shoulder Angle</span>
                            </div>
                        </button>
                        <button class="sgc-ex-select-btn" data-ex="deadlift">
                            <span class="sgc-ex-icon">💪</span>
                            <div class="sgc-ex-details">
                                <span class="sgc-ex-name">Conventional Deadlift</span>
                                <span class="sgc-ex-meta">Spine & Hip Mechanics</span>
                            </div>
                        </button>
                        <button class="sgc-ex-select-btn" data-ex="bicep_curl">
                            <span class="sgc-ex-icon">🥤</span>
                            <div class="sgc-ex-details">
                                <span class="sgc-ex-name">Standing Bicep Curl</span>
                                <span class="sgc-ex-meta">Elbow Joint Flexion</span>
                            </div>
                        </button>
                        <button class="sgc-ex-select-btn" data-ex="ohp">
                            <span class="sgc-ex-icon">⬆️</span>
                            <div class="sgc-ex-details">
                                <span class="sgc-ex-name">Overhead Press</span>
                                <span class="sgc-ex-meta">Shoulder & Elbow Drive</span>
                            </div>
                        </button>
                        <button class="sgc-ex-select-btn" data-ex="row">
                            <span class="sgc-ex-icon">🚣</span>
                            <div class="sgc-ex-details">
                                <span class="sgc-ex-name">Barbell Row</span>
                                <span class="sgc-ex-meta">Torso & Elbow Pull</span>
                            </div>
                        </button>
                        <button class="sgc-ex-select-btn" data-ex="leg_raise">
                            <span class="sgc-ex-icon">🦵</span>
                            <div class="sgc-ex-details">
                                <span class="sgc-ex-name">Lying Leg Raise</span>
                                <span class="sgc-ex-meta">Hip Flexion & Core</span>
                            </div>
                        </button>
                    </div>
                    
                    <div class="sgc-warning-box-side">
                        <div class="sgc-w-icon">⚠️</div>
                        <div>
                            <h4>Injury Prevention</h4>
                            <p>Toggle "Show Mistakes" to see how poor posture affects your joints and increases shearing stress.</p>
                        </div>
                    </div>
                </div>

                <!-- Main Canvas/SVG Interactive Screen -->
                <div class="sgc-card sgc-glassmorphism sgc-visualizer-display">
                    <div class="sgc-display-header">
                        <div>
                            <h3 id="sgc-vis-title">Barbell Squat</h3>
                            <span class="sgc-live-indicator"><span class="sgc-pulse-dot"></span> Joint Angle Engine Active</span>
                        </div>
                        <div class="sgc-toggle-wrapper">
                            <label class="sgc-switch">
                                <input type="checkbox" id="sgc-toggle-mistake">
                                <span class="sgc-slider-round"></span>
                            </label>
                            <span class="sgc-toggle-label">Show Mistakes</span>
                        </div>
                    </div>

                    <!-- Interactive Vector Simulator -->
                    <div class="sgc-simulator-container">
                        <!-- Grid Overlay -->
                        <div class="sgc-simulator-grid"></div>
                        
                        <!-- Main Interactive SVG -->
                        <svg id="sgc-interactive-svg" viewBox="0 0 500 400" width="100%" height="100%">
                            <!-- SVG contents drawn dynamically by JavaScript -->
                        </svg>

                        <!-- Load Stress Visual Overlay (Glow behind spine/joints under pressure) -->
                        <div id="sgc-stress-glow" class="sgc-stress-overlay"></div>
                    </div>

                    <!-- Control Panel underneath simulation -->
                    <div class="sgc-sim-controls">
                        <div class="sgc-control-row">
                            <span class="sgc-control-label">Range of Motion (Scrub):</span>
                            <div class="sgc-slider-container">
                                <span class="sgc-rom-val">Eccentric</span>
                                <input type="range" id="sgc-rom-slider" min="0" max="100" value="0" class="sgc-range-slider">
                                <span class="sgc-rom-val">Concentric</span>
                            </div>
                        </div>
                        
                        <div class="sgc-control-row sgc-btn-row">
                            <button id="sgc-play-btn" class="sgc-action-btn">
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="5 3 19 12 5 21 5 3"/></svg>
                                <span>Animate Rep</span>
                            </button>
                            <div class="sgc-angle-readouts">
                                <div class="sgc-readout">
                                    <span class="sgc-readout-lbl">Primary Joint:</span>
                                    <span id="sgc-primary-angle-text" class="sgc-readout-val">180°</span>
                                </div>
                                <div class="sgc-readout">
                                    <span class="sgc-readout-lbl">Safety Rating:</span>
                                    <span id="sgc-safety-rating" class="sgc-safety-badge badge-green">OPTIMAL</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Explanation / Bio-feedback Panel -->
                <div class="sgc-card sgc-glassmorphism sgc-visualizer-feedback">
                    <div class="sgc-card-header">
                        <h3>Biomechanical Analysis</h3>
                    </div>
                    <div class="sgc-feedback-content">
                        <div class="sgc-feedback-section">
                            <h4>Posture Status & Angle Data</h4>
                            <div class="sgc-status-gauge">
                                <div class="sgc-gauge-bar"><div id="sgc-gauge-fill" class="sgc-gauge-fill" style="width: 100%"></div></div>
                                <p id="sgc-angle-verdict" class="sgc-verdict-text">Spine is neutral. Standing straight, prep phase.</p>
                            </div>
                        </div>

                        <div class="sgc-feedback-section">
                            <h4>Target Angles & Safety Zones</h4>
                            <div id="sgc-angle-ranges" class="sgc-info-grid">
                                <!-- Populated Dynamically -->
                            </div>
                        </div>

                        <div class="sgc-feedback-section">
                            <h4>Form Cue & Focus</h4>
                            <div class="sgc-cue-box">
                                <div class="sgc-cue-icon">💡</div>
                                <p id="sgc-form-cue-text">Keep your heels firmly on the floor and push your hips back as if sitting in a chair.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <!-- TAB 3: PROTEIN & NUTRITION CALCULATOR -->
        <section id="sgc-tab-macro-calc" class="sgc-tab-content">
            <div class="sgc-grid-calc">
                <!-- Inputs Section -->
                <div class="sgc-card sgc-glassmorphism sgc-calc-inputs">
                    <div class="sgc-card-header">
                        <h3>Biometric Inputs</h3>
                        <p class="sgc-card-sub">Science-backed caloric and macronutrient assessment</p>
                    </div>

                    <form id="sgc-nutr-form" onsubmit="return false;">
                        <div class="sgc-form-row">
                            <div class="sgc-form-group">
                                <label for="sgc-gender">Gender</label>
                                <select id="sgc-gender" class="sgc-form-control">
                                    <option value="male">Male</option>
                                    <option value="female">Female</option>
                                </select>
                            </div>
                            <div class="sgc-form-group">
                                <label for="sgc-age">Age (Years)</label>
                                <input type="number" id="sgc-age" class="sgc-form-control" value="25" min="15" max="80">
                            </div>
                        </div>

                        <div class="sgc-form-row">
                            <div class="sgc-form-group">
                                <label for="sgc-weight">Weight</label>
                                <div class="sgc-input-addon">
                                    <input type="number" id="sgc-weight" class="sgc-form-control" value="75" min="30" max="250">
                                    <select id="sgc-weight-unit" class="sgc-addon-select">
                                        <option value="kg">kg</option>
                                        <option value="lbs">lbs</option>
                                    </select>
                                </div>
                            </div>
                            <div class="sgc-form-group">
                                <label for="sgc-height">Height</label>
                                <div class="sgc-input-addon">
                                    <input type="number" id="sgc-height" class="sgc-form-control" value="175" min="100" max="250">
                                    <select id="sgc-height-unit" class="sgc-addon-select">
                                        <option value="cm">cm</option>
                                        <option value="in">in</option>
                                    </select>
                                </div>
                            </div>
                        </div>

                        <div class="sgc-form-group">
                            <label for="sgc-activity">Daily Activity Level</label>
                            <select id="sgc-activity" class="sgc-form-control">
                                <option value="1.2">Sedentary (Office job, little exercise)</option>
                                <option value="1.375">Light Activity (1-3 days gym / walk)</option>
                                <option value="1.55" selected>Moderate Activity (3-5 days hard gym)</option>
                                <option value="1.725">Very Active (6-7 days hard gym / athlete)</option>
                                <option value="1.9">Extreme Active (Hard physical labor + heavy training)</option>
                            </select>
                        </div>

                        <div class="sgc-form-group">
                            <label for="sgc-goal">Primary Fitness Goal</label>
                            <select id="sgc-goal" class="sgc-form-control">
                                <option value="lose">Fat Loss (Caloric Deficit)</option>
                                <option value="maintain">Body Recomposition / Maintenance</option>
                                <option value="build" selected>Lean Muscle Build (Caloric Surplus)</option>
                            </select>
                        </div>

                        <div class="sgc-form-group">
                            <label for="sgc-diet-type">Macro Ratio Theme</label>
                            <select id="sgc-diet-type" class="sgc-form-control">
                                <option value="balanced" selected>Balanced (40% Carbs, 30% Protein, 30% Fat)</option>
                                <option value="high-protein">High Protein (35% Carbs, 40% Protein, 25% Fat)</option>
                                <option value="low-carb">Low Carb / Athletic Keto (15% Carbs, 35% Protein, 50% Fat)</option>
                            </select>
                        </div>

                        <button id="sgc-calc-btn" class="sgc-calc-submit-btn">
                            <span>Calculate Biomarkers</span>
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                        </button>
                    </form>
                </div>

                <!-- Outputs / Results Area -->
                <div class="sgc-card sgc-glassmorphism sgc-calc-results">
                    <div class="sgc-card-header">
                        <h3>Your Caloric & Protein Profile</h3>
                        <p class="sgc-card-sub">Calculated via Mifflin-St Jeor and dynamic protein partitioning.</p>
                    </div>

                    <!-- Calorie Display Circles -->
                    <div class="sgc-metrics-summary-grid">
                        <div class="sgc-metric-summary-box">
                            <span class="sgc-sm-lbl">BMR (Base Needs)</span>
                            <span id="sgc-res-bmr" class="sgc-sm-val">--</span>
                            <span class="sgc-sm-unit">kcal / day</span>
                        </div>
                        <div class="sgc-metric-summary-box active-glow">
                            <span class="sgc-sm-lbl">Target Intake</span>
                            <span id="sgc-res-target" class="sgc-sm-val">--</span>
                            <span class="sgc-sm-unit">kcal / day</span>
                        </div>
                        <div class="sgc-metric-summary-box">
                            <span class="sgc-sm-lbl">TDEE (Maintenance)</span>
                            <span id="sgc-res-tdee" class="sgc-sm-val">--</span>
                            <span class="sgc-sm-unit">kcal / day</span>
                        </div>
                    </div>

                    <!-- Macro Progress Rings (Responsive grid of donuts) -->
                    <div class="sgc-macro-breakdown">
                        <h4>Daily Target Macros</h4>
                        <div class="sgc-macro-rings">
                            <!-- Protein -->
                            <div class="sgc-macro-ring-container">
                                <div class="sgc-macro-ring-svg-wrap">
                                    <svg viewBox="0 0 36 36" class="sgc-circular-chart purple">
                                        <path class="sgc-circle-bg" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                                        <path id="sgc-protein-ring" class="sgc-circle" stroke-dasharray="0, 100" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                                    </svg>
                                    <div class="sgc-macro-val-inside">
                                        <span id="sgc-protein-grams">--g</span>
                                    </div>
                                </div>
                                <span class="sgc-macro-name">Protein</span>
                                <span id="sgc-protein-kcals" class="sgc-macro-kcal-lbl">-- kcal</span>
                            </div>

                            <!-- Carbs -->
                            <div class="sgc-macro-ring-container">
                                <div class="sgc-macro-ring-svg-wrap">
                                    <svg viewBox="0 0 36 36" class="sgc-circular-chart cyan">
                                        <path class="sgc-circle-bg" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                                        <path id="sgc-carbs-ring" class="sgc-circle" stroke-dasharray="0, 100" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                                    </svg>
                                    <div class="sgc-macro-val-inside">
                                        <span id="sgc-carbs-grams">--g</span>
                                    </div>
                                </div>
                                <span class="sgc-macro-name">Carbs</span>
                                <span id="sgc-carbs-kcals" class="sgc-macro-kcal-lbl">-- kcal</span>
                            </div>

                            <!-- Fats -->
                            <div class="sgc-macro-ring-container">
                                <div class="sgc-macro-ring-svg-wrap">
                                    <svg viewBox="0 0 36 36" class="sgc-circular-chart yellow">
                                        <path class="sgc-circle-bg" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                                        <path id="sgc-fats-ring" class="sgc-circle" stroke-dasharray="0, 100" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                                    </svg>
                                    <div class="sgc-macro-val-inside">
                                        <span id="sgc-fats-grams">--g</span>
                                    </div>
                                </div>
                                <span class="sgc-macro-name">Fats</span>
                                <span id="sgc-fats-kcals" class="sgc-macro-kcal-lbl">-- kcal</span>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Bio-supplemental & Hydration outputs -->
                <div class="sgc-card sgc-glassmorphism sgc-calc-supplements">
                    <div class="sgc-card-header">
                        <h3>Biomarker Support Guides</h3>
                        <p class="sgc-card-sub">Customized hydration and loading schedules</p>
                    </div>

                    <div class="sgc-supp-grid">
                        <div class="sgc-supp-box">
                            <div class="sgc-supp-icon">💧</div>
                            <div class="sgc-supp-info">
                                <h4>Daily Target Hydration</h4>
                                <p class="sgc-supp-val" id="sgc-res-water">-- Liters</p>
                                <p class="sgc-supp-desc">Drink clean water consistently throughout the day. Add 500ml for each hour trained.</p>
                            </div>
                        </div>

                        <div class="sgc-supp-box">
                            <div class="sgc-supp-icon">⚡</div>
                            <div class="sgc-supp-info">
                                <h4>Creatine Monohydrate dosage</h4>
                                <div class="sgc-creatine-detail">
                                    <div><strong>Loading Phase:</strong> <span id="sgc-creatine-load">--</span>g/day (5-7 days)</div>
                                    <div><strong>Maintenance:</strong> <span id="sgc-creatine-maint">--</span>g/day (Everyday)</div>
                                </div>
                                <p class="sgc-supp-desc">Highly researched compound. Increases muscular power output and intracellular hydration.</p>
                            </div>
                        </div>
                    </div>

                    <!-- Dynamic Meal planner output -->
                    <div class="sgc-meal-distribution">
                        <h4>Optimal Meal Distribution</h4>
                        <p class="sgc-card-sub">Distributing your daily target intake across equal feedings:</p>
                        <div class="sgc-meal-selector-wrap">
                            <span class="sgc-meal-lbl">Meals/Day:</span>
                            <div class="sgc-meal-buttons">
                                <button class="sgc-meal-btn active" data-meals="3">3 Meals</button>
                                <button class="sgc-meal-btn" data-meals="4">4 Meals</button>
                                <button class="sgc-meal-btn" data-meals="5">5 Meals</button>
                            </div>
                        </div>
                        <div id="sgc-meal-breakdown-list" class="sgc-meal-cards">
                            <!-- Populated Dynamically -->
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <!-- TAB 4: BEGINNER PLAYBOOK -->
        <section id="sgc-tab-gym-playbook" class="sgc-tab-content">
            <div class="sgc-grid-playbook">
                <!-- Interactive progressive overload slider demonstration -->
                <div class="sgc-card sgc-glassmorphism sgc-playbook-card">
                    <div class="sgc-card-header">
                        <h3>Dynamic Principle: Progressive Overload</h3>
                        <p class="sgc-card-sub">The foundation of muscular growth. Drag the bar to see how muscle adapts to progressive stress!</p>
                    </div>

                    <div class="sgc-overload-demo">
                        <div class="sgc-overload-visuals">
                            <!-- Muscle Growth visualization -->
                            <div class="sgc-muscle-visual-box">
                                <div id="sgc-muscle-demo-size" class="sgc-muscle-node-graphic">💪</div>
                                <span class="sgc-muscle-size-lbl">Muscle Fiber Thickness</span>
                            </div>
                            <!-- Weight visualization -->
                            <div class="sgc-weight-visual-box">
                                <div id="sgc-weight-plate-stack" class="sgc-plate-stack">
                                    <div class="sgc-plate p45"></div>
                                </div>
                                <span id="sgc-weight-demo-val" class="sgc-weight-lbl">45 lbs</span>
                            </div>
                        </div>

                        <div class="sgc-overload-control">
                            <label for="sgc-overload-slider">Load Intensity (Progression):</label>
                            <input type="range" id="sgc-overload-slider" min="1" max="5" value="1" step="1" class="sgc-range-slider">
                            <div class="sgc-steps-lbl">
                                <span>Week 1 (Base)</span>
                                <span>Week 2</span>
                                <span>Week 3</span>
                                <span>Week 4</span>
                                <span>Week 5 (Peak)</span>
                            </div>
                        </div>

                        <div class="sgc-overload-explanation">
                            <h4 id="sgc-overload-status-title">Adaptive Baseline: Week 1</h4>
                            <p id="sgc-overload-status-desc">You lift a comfortable base weight. Your body matches the stimulus but doesn't feel the need to synthesise new myofibrillar tissue yet.</p>
                        </div>
                    </div>
                </div>

                <!-- Warm Up and Terms -->
                <div class="sgc-card sgc-glassmorphism sgc-playbook-info-card">
                    <h3>Essential Beginner Rules</h3>
                    <div class="sgc-rules-accordion">
                        <div class="sgc-rule-item">
                            <div class="sgc-rule-header">
                                <span class="sgc-rule-num">01</span>
                                <h4>Dynamic Warm Up Protocol</h4>
                            </div>
                            <div class="sgc-rule-body">
                                <p>Spend 5-10 minutes increasing core temperature. Avoid static stretching before lifting; perform dynamic joint rotations, arm circles, leg swings, and warm-up sets (with empty bar) to lubricate joint capsules with synovial fluid.</p>
                            </div>
                        </div>

                        <div class="sgc-rule-item">
                            <div class="sgc-rule-header">
                                <span class="sgc-rule-num">02</span>
                                <h4>Understanding RPE Scale</h4>
                            </div>
                            <div class="sgc-rule-body">
                                <p><strong>RPE (Rate of Perceived Exertion)</strong> measures how close you are to muscular failure on a scale of 1-10:</p>
                                <ul>
                                    <li><strong>RPE 7:</strong> 3 reps left in the tank (good training weight)</li>
                                    <li><strong>RPE 8:</strong> 2 reps left in the tank (optimal hypertrophy)</li>
                                    <li><strong>RPE 9:</strong> 1 rep left in the tank (high intensity)</li>
                                    <li><strong>RPE 10:</strong> Absolute failure. Do not exceed this as a beginner!</li>
                                </ul>
                            </div>
                        </div>

                        <div class="sgc-rule-item">
                            <div class="sgc-rule-header">
                                <span class="sgc-rule-num">03</span>
                                <h4>Hypertrophy & Sleep</h4>
                            </div>
                            <div class="sgc-rule-body">
                                <p>Lifting weights doesn't grow muscles—it tears them down (microtrauma). Growth occurs during deep sleep stages when Growth Hormone (GH) is secreted and protein synthesis is peaked. Aim for 7.5 to 9 hours of quality sleep nightly.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>

    </main>
</div>
