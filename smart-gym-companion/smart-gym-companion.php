<?php
/**
 * Plugin Name: Smart Gym Companion: Posture & Nutrition Pro
 * Description: An interactive, premium visual plugin for gym beginners. Features an interactive muscle map, a joint angle and posture visualizer for exercises (Squat, Bench Press, Deadlift, Bicep Curl), and a scientific protein and macro calculator with dark glassmorphic aesthetics.
 * Version:     1.0.0
 * Author:      Antigravity AI
 * License:     GPL2
 * Text Domain: smart-gym-companion
 */

// Prevent direct access
if ( ! defined( 'ABSPATH' ) ) {
    exit;
}

// Define Constants
define( 'SGC_VERSION', '1.0.0' );
define( 'SGC_PATH', plugin_dir_path( __FILE__ ) );
define( 'SGC_URL', plugin_dir_url( __FILE__ ) );

// Include Core Files
require_once SGC_PATH . 'includes/class-sgc-shortcode.php';

// Initialize the plugin shortcode
add_action( 'plugins_loaded', 'sgc_init_gym_companion' );
function sgc_init_gym_companion() {
    new SGC_Shortcode();
}
