/**
 * ============================================================
 * S-PHARMA SUPER PREMIUM SPLASH SCREEN
 * ============================================================
 * A production-level, visually stunning splash screen for the
 * S-Pharma healthcare/pharmacy application.
 * 
 * Features:
 *  - Full-screen immersive gradient background
 *  - Animated logo with medical cross + modern styling
 *  - Heartbeat pulse animation
 *  - Floating particle system with 60+ particles
 *  - Custom loading indicator with orbital rings
 *  - Letter-by-letter tagline animation
 *  - DNA helix animation
 *  - Glow and shimmer effects
 *  - Circular progress rings
 *  - Wave animations
 *  - Star/sparkle effects
 *  - Smooth auto-navigation after splash completes
 * 
 * Brand: S-Pharma - Your Smart Health Partner
 * Theme: Healthcare + Pharmacy + Trust + Technology
 * Colors: Deep Blue (#0A1F44), Medical Green (#00C853), White
 * 
 * Tech: React Native (Expo), Animated API, LinearGradient
 * ============================================================
 */

import React, { useEffect, useRef, useState, useMemo, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Animated,
  Easing,
  Platform,
  StatusBar,
  PixelRatio,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

// ============================================================
// SCREEN DIMENSIONS & RESPONSIVE UTILITIES
// ============================================================
const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');
const PIXEL_RATIO = PixelRatio.get();
const IS_SMALL_DEVICE = SCREEN_WIDTH < 375;
const IS_LARGE_DEVICE = SCREEN_WIDTH >= 414;
const ASPECT_RATIO = SCREEN_HEIGHT / SCREEN_WIDTH;
const IS_TALL_DEVICE = ASPECT_RATIO > 1.8;

/**
 * Responsive scaling utility functions
 * Adapts UI elements proportionally to screen size
 */
const scale = (size) => (SCREEN_WIDTH / 375) * size;
const verticalScale = (size) => (SCREEN_HEIGHT / 812) * size;
const moderateScale = (size, factor = 0.5) =>
  size + (scale(size) - size) * factor;
const fontScale = (size) => {
  const newSize = scale(size);
  if (Platform.OS === 'ios') {
    return Math.round(PixelRatio.roundToNearestPixel(newSize));
  }
  return Math.round(PixelRatio.roundToNearestPixel(newSize)) - 1;
};

// ============================================================
// BRAND CONSTANTS & THEME CONFIGURATION
// ============================================================

/**
 * Primary brand colors for S-Pharma
 * Deep Blue: Trust, professionalism, healthcare authority
 * Medical Green: Health, vitality, pharmacy
 * White/Light: Cleanliness, purity, modern
 */
const COLORS = {
  // Primary palette
  primaryDeepBlue: '#0A1F44',
  primaryDarkBlue: '#0D2B5E',
  primaryMediumBlue: '#1A3A6B',
  primaryLightBlue: '#2E5090',
  primarySkyBlue: '#4A90D9',
  primaryBabyBlue: '#87CEEB',

  // Medical green spectrum
  medicalGreenDark: '#00963F',
  medicalGreen: '#00C853',
  medicalGreenLight: '#00E676',
  medicalGreenBright: '#69F0AE',
  medicalGreenPale: '#B9F6CA',
  medicalGreenGlow: '#00FF6640',

  // Accent colors
  accentWhite: '#FFFFFF',
  accentOffWhite: '#F8FAFC',
  accentLightGray: '#E2E8F0',
  accentSilver: '#CBD5E1',
  accentGold: '#FFD700',
  accentGoldLight: '#FFE44D',

  // Transparency variants
  whiteTransparent10: 'rgba(255, 255, 255, 0.10)',
  whiteTransparent15: 'rgba(255, 255, 255, 0.15)',
  whiteTransparent20: 'rgba(255, 255, 255, 0.20)',
  whiteTransparent30: 'rgba(255, 255, 255, 0.30)',
  whiteTransparent40: 'rgba(255, 255, 255, 0.40)',
  whiteTransparent50: 'rgba(255, 255, 255, 0.50)',
  whiteTransparent60: 'rgba(255, 255, 255, 0.60)',
  whiteTransparent70: 'rgba(255, 255, 255, 0.70)',
  whiteTransparent80: 'rgba(255, 255, 255, 0.80)',
  whiteTransparent90: 'rgba(255, 255, 255, 0.90)',

  // Glow and effect colors
  blueGlow: 'rgba(74, 144, 217, 0.40)',
  greenGlow: 'rgba(0, 200, 83, 0.40)',
  goldGlow: 'rgba(255, 215, 0, 0.30)',
  cyanGlow: 'rgba(0, 255, 255, 0.25)',

  // Gradient stops
  gradientStart: '#0A1F44',
  gradientMid1: '#0D2B5E',
  gradientMid2: '#0F3370',
  gradientMid3: '#0B4F3A',
  gradientEnd: '#00582E',

  // Shadow colors
  shadowBlue: 'rgba(10, 31, 68, 0.50)',
  shadowGreen: 'rgba(0, 200, 83, 0.30)',
  shadowDark: 'rgba(0, 0, 0, 0.40)',
};

/**
 * Animation timing configuration
 * All durations in milliseconds
 */
const TIMING = {
  // Splash screen total duration (10 seconds)
  splashDuration: 10000,

  // Phase 1: Background & ambient effects (0-2s)
  backgroundFadeIn: 800,
  particleSystemStart: 400,
  ambientGlowStart: 600,

  // Phase 2: Logo entrance (1.5-4s)
  logoFadeInDelay: 1500,
  logoFadeInDuration: 1200,
  logoScaleUpDuration: 1400,
  logoCrossAnimDuration: 800,
  logoShieldAnimDuration: 1000,
  logoGlowPulseDuration: 2000,

  // Phase 3: Brand name & tagline (3-6s)
  brandNameDelay: 3000,
  brandNameDuration: 1000,
  taglineDelay: 4200,
  taglineLetterInterval: 60,
  taglineLetterDuration: 400,

  // Phase 4: Decorative elements (2-7s)
  dnaHelixDelay: 2000,
  dnaHelixCycleDuration: 4000,
  orbitalRingDelay: 2500,
  orbitalRingDuration: 6000,
  pulseRingDelay: 3000,
  pulseRingInterval: 1800,
  waveAnimDelay: 1800,
  waveAnimDuration: 3000,

  // Phase 5: Loading indicator (5-9s)
  loadingDelay: 5000,
  loadingFadeIn: 600,
  loadingRotationDuration: 1500,
  loadingProgressDuration: 4000,

  // Phase 6: Exit animation (9-10s)
  exitFadeOutStart: 9000,
  exitFadeOutDuration: 1000,
  exitScaleUpDuration: 800,
};

/**
 * Layout constants for precise positioning
 */
const LAYOUT = {
  // Logo dimensions
  logoContainerSize: moderateScale(180),
  logoInnerSize: moderateScale(140),
  logoCrossWidth: moderateScale(36),
  logoCrossHeight: moderateScale(100),
  logoShieldRadius: moderateScale(70),

  // Brand text
  brandNameFontSize: fontScale(42),
  taglineFontSize: fontScale(16),
  versionFontSize: fontScale(11),

  // Particle system
  particleCount: 65,
  particleMinSize: 2,
  particleMaxSize: 8,

  // DNA helix
  dnaNodeCount: 24,
  dnaNodeSize: moderateScale(6),
  dnaHelixWidth: moderateScale(60),
  dnaHelixHeight: verticalScale(300),

  // Orbital rings
  orbitalRingCount: 3,
  orbitalRingBaseSize: moderateScale(200),
  orbitalRingSizeIncrement: moderateScale(40),

  // Pulse rings
  pulseRingCount: 4,
  pulseRingBaseSize: moderateScale(160),

  // Star/sparkle
  sparkleCount: 20,
  sparkleMinSize: moderateScale(3),
  sparkleMaxSize: moderateScale(10),

  // Wave
  waveCount: 5,
  waveBaseWidth: SCREEN_WIDTH * 1.5,
  waveBaseHeight: verticalScale(80),

  // Loading indicator
  loadingRingSize: moderateScale(50),
  loadingDotCount: 12,
  loadingDotSize: moderateScale(6),
};

/**
 * Font configuration with platform-specific fallbacks
 */
const FONTS = {
  brandName: Platform.select({
    ios: 'Avenir-Heavy',
    android: 'sans-serif-medium',
    default: 'System',
  }),
  tagline: Platform.select({
    ios: 'Avenir-Medium',
    android: 'sans-serif',
    default: 'System',
  }),
  version: Platform.select({
    ios: 'Avenir-Light',
    android: 'sans-serif-light',
    default: 'System',
  }),
};
// ============================================================
// HELPER COMPONENTS
// ============================================================

/**
 * FloatingParticle - Individual animated particle element
 * Creates a softly glowing dot that floats upward with gentle sway
 * Each particle has randomized properties for organic feel
 * 
 * @param {number} index - Unique particle identifier
 * @param {number} delay - Animation start delay in ms
 * @param {number} size - Particle diameter
 * @param {number} startX - Initial horizontal position
 * @param {number} startY - Initial vertical position
 * @param {number} duration - Full animation cycle duration
 * @param {string} color - Particle glow color
 * @param {number} opacity - Maximum opacity value
 * @param {number} swayAmount - Horizontal sway magnitude
 */
const FloatingParticle = React.memo(({
  index,
  delay,
  size,
  startX,
  startY,
  duration,
  color,
  opacity,
  swayAmount,
}) => {
  const animY = useRef(new Animated.Value(0)).current;
  const animX = useRef(new Animated.Value(0)).current;
  const animOpacity = useRef(new Animated.Value(0)).current;
  const animScale = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const timeout = setTimeout(() => {
      Animated.timing(animOpacity, {
        toValue: opacity,
        duration: 800,
        easing: Easing.ease,
        useNativeDriver: true,
      }).start();

      Animated.timing(animScale, {
        toValue: 1,
        duration: 600,
        easing: Easing.out(Easing.back(1.5)),
        useNativeDriver: true,
      }).start();

      Animated.loop(
        Animated.timing(animY, {
          toValue: -SCREEN_HEIGHT * 0.7,
          duration: duration,
          easing: Easing.linear,
          useNativeDriver: true,
        })
      ).start();

      Animated.loop(
        Animated.sequence([
          Animated.timing(animX, {
            toValue: swayAmount,
            duration: duration * 0.35,
            easing: Easing.inOut(Easing.sin),
            useNativeDriver: true,
          }),
          Animated.timing(animX, {
            toValue: -swayAmount,
            duration: duration * 0.35,
            easing: Easing.inOut(Easing.sin),
            useNativeDriver: true,
          }),
          Animated.timing(animX, {
            toValue: 0,
            duration: duration * 0.3,
            easing: Easing.inOut(Easing.sin),
            useNativeDriver: true,
          }),
        ])
      ).start();
    }, delay);

    return () => clearTimeout(timeout);
  }, []);

  return (
    <Animated.View
      style={[
        styles.floatingParticle,
        {
          width: size,
          height: size,
          borderRadius: size / 2,
          backgroundColor: color,
          left: startX,
          top: startY,
          opacity: animOpacity,
          transform: [
            { translateY: animY },
            { translateX: animX },
            { scale: animScale },
          ],
        },
      ]}
    >
      <View
        style={{
          width: size * 0.5,
          height: size * 0.5,
          borderRadius: size * 0.25,
          backgroundColor: COLORS.accentWhite,
          position: 'absolute',
          top: size * 0.25,
          left: size * 0.25,
          opacity: 0.8,
        }}
      />
    </Animated.View>
  );
});

/**
 * SparkleEffect - Creates a twinkling star/sparkle element
 * Four-pointed star shape with pulsing opacity and rotation
 * 
 * @param {number} x - Horizontal position
 * @param {number} y - Vertical position
 * @param {number} size - Star size
 * @param {number} delay - Animation delay
 * @param {number} duration - Twinkle cycle duration
 */
const SparkleEffect = React.memo(({ x, y, size, delay, duration }) => {
  const animOpacity = useRef(new Animated.Value(0)).current;
  const animScale = useRef(new Animated.Value(0.3)).current;
  const animRotation = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const timeout = setTimeout(() => {
      Animated.loop(
        Animated.sequence([
          Animated.timing(animOpacity, {
            toValue: 1,
            duration: duration * 0.4,
            easing: Easing.inOut(Easing.ease),
            useNativeDriver: true,
          }),
          Animated.timing(animOpacity, {
            toValue: 0.1,
            duration: duration * 0.6,
            easing: Easing.inOut(Easing.ease),
            useNativeDriver: true,
          }),
        ])
      ).start();

      Animated.loop(
        Animated.sequence([
          Animated.timing(animScale, {
            toValue: 1.2,
            duration: duration * 0.5,
            easing: Easing.inOut(Easing.ease),
            useNativeDriver: true,
          }),
          Animated.timing(animScale, {
            toValue: 0.3,
            duration: duration * 0.5,
            easing: Easing.inOut(Easing.ease),
            useNativeDriver: true,
          }),
        ])
      ).start();

      Animated.loop(
        Animated.timing(animRotation, {
          toValue: 1,
          duration: duration * 2,
          easing: Easing.linear,
          useNativeDriver: true,
        })
      ).start();
    }, delay);

    return () => clearTimeout(timeout);
  }, []);

  const rotateInterpolation = animRotation.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  return (
    <Animated.View
      style={[
        styles.sparkleContainer,
        {
          left: x,
          top: y,
          width: size,
          height: size,
          opacity: animOpacity,
          transform: [
            { scale: animScale },
            { rotate: rotateInterpolation },
          ],
        },
      ]}
    >
      <View
        style={{
          position: 'absolute',
          width: size,
          height: size * 0.15,
          backgroundColor: COLORS.accentWhite,
          borderRadius: size * 0.075,
          top: size * 0.425,
          left: 0,
          opacity: 0.9,
        }}
      />
      <View
        style={{
          position: 'absolute',
          width: size * 0.15,
          height: size,
          backgroundColor: COLORS.accentWhite,
          borderRadius: size * 0.075,
          top: 0,
          left: size * 0.425,
          opacity: 0.9,
        }}
      />
      <View
        style={{
          position: 'absolute',
          width: size * 0.7,
          height: size * 0.1,
          backgroundColor: COLORS.accentWhite,
          borderRadius: size * 0.05,
          top: size * 0.45,
          left: size * 0.15,
          transform: [{ rotate: '45deg' }],
          opacity: 0.6,
        }}
      />
      <View
        style={{
          position: 'absolute',
          width: size * 0.7,
          height: size * 0.1,
          backgroundColor: COLORS.accentWhite,
          borderRadius: size * 0.05,
          top: size * 0.45,
          left: size * 0.15,
          transform: [{ rotate: '-45deg' }],
          opacity: 0.6,
        }}
      />
    </Animated.View>
  );
});

/**
 * PulseRing - Expanding circular pulse ring animation
 * Creates a ring that expands outward from center and fades
 * Simulates heartbeat/sonar style effect
 * 
 * @param {number} delay - Initial delay before first pulse
 * @param {number} size - Starting ring diameter
 * @param {string} color - Ring border color
 * @param {number} duration - Full expansion cycle duration
 * @param {number} maxScale - Maximum expansion scale factor
 */
const PulseRing = React.memo(({ delay, size, color, duration, maxScale }) => {
  const animScale = useRef(new Animated.Value(0.4)).current;
  const animOpacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const timeout = setTimeout(() => {
      Animated.loop(
        Animated.parallel([
          Animated.timing(animScale, {
            toValue: maxScale,
            duration: duration,
            easing: Easing.out(Easing.cubic),
            useNativeDriver: true,
          }),
          Animated.sequence([
            Animated.timing(animOpacity, {
              toValue: 0.7,
              duration: duration * 0.15,
              easing: Easing.out(Easing.ease),
              useNativeDriver: true,
            }),
            Animated.timing(animOpacity, {
              toValue: 0,
              duration: duration * 0.85,
              easing: Easing.in(Easing.ease),
              useNativeDriver: true,
            }),
          ]),
        ])
      ).start();
    }, delay);

    return () => clearTimeout(timeout);
  }, []);

  return (
    <Animated.View
      style={[
        styles.pulseRing,
        {
          width: size,
          height: size,
          borderRadius: size / 2,
          borderColor: color,
          opacity: animOpacity,
          transform: [{ scale: animScale }],
        },
      ]}
    />
  );
});

/**
 * DNAHelixNode - Individual node in the DNA double helix
 * Animated dot that follows a sinusoidal path
 * Paired nodes connected by lines to form the helix structure
 * 
 * @param {number} index - Node position in helix
 * @param {number} totalNodes - Total nodes for spacing calculation
 * @param {number} delay - Animation start delay
 * @param {string} side - 'left' or 'right' strand
 * @param {number} helixWidth - Total helix width
 * @param {number} helixHeight - Total helix height
 */
const DNAHelixNode = React.memo(({
  index,
  totalNodes,
  delay,
  side,
  helixWidth,
  helixHeight,
}) => {
  const animProgress = useRef(new Animated.Value(0)).current;
  const animOpacity = useRef(new Animated.Value(0)).current;
  const animGlow = useRef(new Animated.Value(0.5)).current;

  useEffect(() => {
    const timeout = setTimeout(() => {
      Animated.timing(animOpacity, {
        toValue: 1,
        duration: 600,
        easing: Easing.ease,
        useNativeDriver: true,
      }).start();

      Animated.loop(
        Animated.timing(animProgress, {
          toValue: 1,
          duration: TIMING.dnaHelixCycleDuration,
          easing: Easing.linear,
          useNativeDriver: true,
        })
      ).start();

      Animated.loop(
        Animated.sequence([
          Animated.timing(animGlow, {
            toValue: 1,
            duration: 1200,
            easing: Easing.inOut(Easing.ease),
            useNativeDriver: true,
          }),
          Animated.timing(animGlow, {
            toValue: 0.5,
            duration: 1200,
            easing: Easing.inOut(Easing.ease),
            useNativeDriver: true,
          }),
        ])
      ).start();
    }, delay);

    return () => clearTimeout(timeout);
  }, []);

  const phaseOffset = (index / totalNodes) * Math.PI * 2;
  const sideMultiplier = side === 'left' ? 1 : -1;
  const yPosition = (index / totalNodes) * helixHeight;

  const translateX = animProgress.interpolate({
    inputRange: [0, 0.25, 0.5, 0.75, 1],
    outputRange: [
      Math.sin(phaseOffset) * helixWidth * 0.5 * sideMultiplier,
      Math.sin(phaseOffset + Math.PI * 0.5) * helixWidth * 0.5 * sideMultiplier,
      Math.sin(phaseOffset + Math.PI) * helixWidth * 0.5 * sideMultiplier,
      Math.sin(phaseOffset + Math.PI * 1.5) * helixWidth * 0.5 * sideMultiplier,
      Math.sin(phaseOffset + Math.PI * 2) * helixWidth * 0.5 * sideMultiplier,
    ],
  });

  const nodeSize = LAYOUT.dnaNodeSize;
  const nodeColor = side === 'left' ? COLORS.medicalGreenLight : COLORS.primarySkyBlue;

  return (
    <Animated.View
      style={[
        styles.dnaNode,
        {
          width: nodeSize,
          height: nodeSize,
          borderRadius: nodeSize / 2,
          backgroundColor: nodeColor,
          top: yPosition,
          opacity: animOpacity,
          transform: [{ translateX }],
        },
      ]}
    >
      <Animated.View
        style={{
          width: nodeSize * 2,
          height: nodeSize * 2,
          borderRadius: nodeSize,
          backgroundColor: nodeColor,
          position: 'absolute',
          top: -nodeSize * 0.5,
          left: -nodeSize * 0.5,
          opacity: animGlow.interpolate({
            inputRange: [0.5, 1],
            outputRange: [0.15, 0.35],
          }),
        }}
      />
    </Animated.View>
  );
});

/**
 * WaveAnimation - Smooth sine wave at bottom of screen
 * Creates layered horizontal wave shapes with animation
 * Multiple waves stacked for depth effect
 * 
 * @param {number} index - Wave layer index (0=front)
 * @param {number} delay - Animation start delay
 * @param {string} color - Wave fill color
 * @param {number} amplitude - Wave height
 * @param {number} speed - Animation speed (ms per cycle)
 */
const WaveAnimation = React.memo(({ index, delay, color, amplitude, speed }) => {
  const animTranslateX = useRef(new Animated.Value(0)).current;
  const animOpacity = useRef(new Animated.Value(0)).current;
  const animTranslateY = useRef(new Animated.Value(20)).current;

  useEffect(() => {
    const timeout = setTimeout(() => {
      Animated.timing(animOpacity, {
        toValue: 0.15 + index * 0.05,
        duration: 1200,
        easing: Easing.ease,
        useNativeDriver: true,
      }).start();

      Animated.timing(animTranslateY, {
        toValue: 0,
        duration: 1000,
        easing: Easing.out(Easing.ease),
        useNativeDriver: true,
      }).start();

      Animated.loop(
        Animated.sequence([
          Animated.timing(animTranslateX, {
            toValue: -SCREEN_WIDTH * 0.3,
            duration: speed,
            easing: Easing.inOut(Easing.sin),
            useNativeDriver: true,
          }),
          Animated.timing(animTranslateX, {
            toValue: SCREEN_WIDTH * 0.3,
            duration: speed,
            easing: Easing.inOut(Easing.sin),
            useNativeDriver: true,
          }),
          Animated.timing(animTranslateX, {
            toValue: 0,
            duration: speed * 0.5,
            easing: Easing.inOut(Easing.sin),
            useNativeDriver: true,
          }),
        ])
      ).start();
    }, delay);

    return () => clearTimeout(timeout);
  }, []);

  return (
    <Animated.View
      style={[
        styles.waveContainer,
        {
          bottom: index * amplitude * 0.6,
          opacity: animOpacity,
          transform: [
            { translateX: animTranslateX },
            { translateY: animTranslateY },
          ],
        },
      ]}
    >
      <View style={[styles.waveShape, { height: amplitude, backgroundColor: color }]}>
        <View
          style={{
            position: 'absolute',
            top: -amplitude * 0.5,
            left: 0,
            width: SCREEN_WIDTH * 0.5,
            height: amplitude,
            borderRadius: amplitude,
            backgroundColor: color,
          }}
        />
        <View
          style={{
            position: 'absolute',
            top: -amplitude * 0.3,
            left: SCREEN_WIDTH * 0.25,
            width: SCREEN_WIDTH * 0.5,
            height: amplitude * 0.8,
            borderRadius: amplitude,
            backgroundColor: color,
          }}
        />
        <View
          style={{
            position: 'absolute',
            top: -amplitude * 0.45,
            left: SCREEN_WIDTH * 0.6,
            width: SCREEN_WIDTH * 0.5,
            height: amplitude * 0.9,
            borderRadius: amplitude,
            backgroundColor: color,
          }}
        />
        <View
          style={{
            position: 'absolute',
            top: -amplitude * 0.25,
            right: 0,
            width: SCREEN_WIDTH * 0.4,
            height: amplitude * 0.7,
            borderRadius: amplitude,
            backgroundColor: color,
          }}
        />
      </View>
    </Animated.View>
  );
});

/**
 * OrbitalRing - Rotating elliptical ring around the logo
 * Creates the impression of atomic/molecular orbital paths
 * Each ring has a dot that travels along the path
 * 
 * @param {number} size - Ring diameter
 * @param {number} delay - Start delay
 * @param {number} duration - Rotation cycle duration
 * @param {string} color - Ring color
 * @param {number} tiltAngle - 3D tilt in degrees
 * @param {number} dotSize - Orbiting dot diameter
 */
const OrbitalRing = React.memo(({ size, delay, duration, color, tiltAngle, dotSize }) => {
  const animRotation = useRef(new Animated.Value(0)).current;
  const animOpacity = useRef(new Animated.Value(0)).current;
  const animDotPosition = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const timeout = setTimeout(() => {
      Animated.timing(animOpacity, {
        toValue: 0.6,
        duration: 1000,
        easing: Easing.ease,
        useNativeDriver: true,
      }).start();

      Animated.loop(
        Animated.timing(animRotation, {
          toValue: 1,
          duration: duration,
          easing: Easing.linear,
          useNativeDriver: true,
        })
      ).start();

      Animated.loop(
        Animated.timing(animDotPosition, {
          toValue: 1,
          duration: duration * 0.8,
          easing: Easing.linear,
          useNativeDriver: true,
        })
      ).start();
    }, delay);

    return () => clearTimeout(timeout);
  }, []);

  const rotateZ = animRotation.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  const dotTranslateX = animDotPosition.interpolate({
    inputRange: [0, 0.25, 0.5, 0.75, 1],
    outputRange: [size / 2, 0, -size / 2, 0, size / 2],
  });

  const dotTranslateY = animDotPosition.interpolate({
    inputRange: [0, 0.25, 0.5, 0.75, 1],
    outputRange: [0, size / 4, 0, -size / 4, 0],
  });

  return (
    <Animated.View
      style={[
        styles.orbitalRing,
        {
          width: size,
          height: size * 0.4,
          borderRadius: size * 0.2,
          borderColor: color,
          opacity: animOpacity,
          transform: [
            { rotateZ },
            { rotateX: `${tiltAngle}deg` },
          ],
        },
      ]}
    >
      <Animated.View
        style={{
          position: 'absolute',
          width: dotSize,
          height: dotSize,
          borderRadius: dotSize / 2,
          backgroundColor: COLORS.accentWhite,
          top: '50%',
          left: '50%',
          marginTop: -dotSize / 2,
          marginLeft: -dotSize / 2,
          transform: [
            { translateX: dotTranslateX },
            { translateY: dotTranslateY },
          ],
        }}
      />
    </Animated.View>
  );
});

/**
 * ShimmerLine - Animated shimmering line effect
 * Creates a glowing line that sweeps across the screen
 * Used for premium visual polish
 * 
 * @param {number} delay - Animation start delay
 * @param {number} y - Vertical position
 * @param {number} width - Line width
 * @param {number} angle - Line angle in degrees
 */
const ShimmerLine = React.memo(({ delay, y, width: lineWidth, angle }) => {
  const animTranslateX = useRef(new Animated.Value(-SCREEN_WIDTH)).current;
  const animOpacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const timeout = setTimeout(() => {
      Animated.loop(
        Animated.sequence([
          Animated.parallel([
            Animated.timing(animTranslateX, {
              toValue: SCREEN_WIDTH * 2,
              duration: 3000,
              easing: Easing.inOut(Easing.ease),
              useNativeDriver: true,
            }),
            Animated.sequence([
              Animated.timing(animOpacity, {
                toValue: 0.5,
                duration: 1000,
                useNativeDriver: true,
              }),
              Animated.timing(animOpacity, {
                toValue: 0,
                duration: 2000,
                useNativeDriver: true,
              }),
            ]),
          ]),
          Animated.delay(2000),
        ])
      ).start();
    }, delay);

    return () => clearTimeout(timeout);
  }, []);

  return (
    <Animated.View
      style={[
        styles.shimmerLine,
        {
          top: y,
          width: lineWidth,
          opacity: animOpacity,
          transform: [
            { translateX: animTranslateX },
            { rotate: `${angle}deg` },
          ],
        },
      ]}
    />
  );
});

/**
 * GlowOrb - Large softly glowing ambient light orb
 * Creates atmospheric background lighting effect
 * Slowly drifts and pulses for organic feel
 * 
 * @param {number} x - Center X position
 * @param {number} y - Center Y position
 * @param {number} size - Orb diameter
 * @param {string} color - Glow color (with transparency)
 * @param {number} delay - Animation start delay
 * @param {number} duration - Pulse cycle duration
 */
const GlowOrb = React.memo(({ x, y, size, color, delay, duration }) => {
  const animScale = useRef(new Animated.Value(0.8)).current;
  const animOpacity = useRef(new Animated.Value(0)).current;
  const animTranslateX = useRef(new Animated.Value(0)).current;
  const animTranslateY = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const timeout = setTimeout(() => {
      Animated.timing(animOpacity, {
        toValue: 1,
        duration: 2000,
        easing: Easing.ease,
        useNativeDriver: true,
      }).start();

      Animated.loop(
        Animated.sequence([
          Animated.timing(animScale, {
            toValue: 1.3,
            duration: duration,
            easing: Easing.inOut(Easing.ease),
            useNativeDriver: true,
          }),
          Animated.timing(animScale, {
            toValue: 0.8,
            duration: duration,
            easing: Easing.inOut(Easing.ease),
            useNativeDriver: true,
          }),
        ])
      ).start();

      Animated.loop(
        Animated.sequence([
          Animated.timing(animTranslateX, {
            toValue: 30,
            duration: duration * 1.5,
            easing: Easing.inOut(Easing.sin),
            useNativeDriver: true,
          }),
          Animated.timing(animTranslateX, {
            toValue: -30,
            duration: duration * 1.5,
            easing: Easing.inOut(Easing.sin),
            useNativeDriver: true,
          }),
        ])
      ).start();

      Animated.loop(
        Animated.sequence([
          Animated.timing(animTranslateY, {
            toValue: 20,
            duration: duration * 1.2,
            easing: Easing.inOut(Easing.sin),
            useNativeDriver: true,
          }),
          Animated.timing(animTranslateY, {
            toValue: -20,
            duration: duration * 1.2,
            easing: Easing.inOut(Easing.sin),
            useNativeDriver: true,
          }),
        ])
      ).start();
    }, delay);

    return () => clearTimeout(timeout);
  }, []);

  return (
    <Animated.View
      style={{
        position: 'absolute',
        left: x - size / 2,
        top: y - size / 2,
        width: size,
        height: size,
        borderRadius: size / 2,
        backgroundColor: color,
        opacity: animOpacity,
        transform: [
          { scale: animScale },
          { translateX: animTranslateX },
          { translateY: animTranslateY },
        ],
      }}
    />
  );
});

/**
 * HeartbeatLine - ECG/EKG style heartbeat line animation
 * Draws an animated cardiogram line across the screen
 * Uses multiple segments to simulate the heartbeat waveform
 * 
 * @param {number} delay - Animation start delay
 */
const HeartbeatLine = React.memo(({ delay }) => {
  const animProgress = useRef(new Animated.Value(0)).current;
  const animOpacity = useRef(new Animated.Value(0)).current;
  const animGlow = useRef(new Animated.Value(0.3)).current;

  useEffect(() => {
    const timeout = setTimeout(() => {
      Animated.timing(animOpacity, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }).start();

      Animated.loop(
        Animated.sequence([
          Animated.timing(animProgress, {
            toValue: 1,
            duration: 2500,
            easing: Easing.linear,
            useNativeDriver: true,
          }),
          Animated.timing(animProgress, {
            toValue: 0,
            duration: 0,
            useNativeDriver: true,
          }),
          Animated.delay(500),
        ])
      ).start();

      Animated.loop(
        Animated.sequence([
          Animated.timing(animGlow, {
            toValue: 1,
            duration: 800,
            easing: Easing.inOut(Easing.ease),
            useNativeDriver: true,
          }),
          Animated.timing(animGlow, {
            toValue: 0.3,
            duration: 800,
            easing: Easing.inOut(Easing.ease),
            useNativeDriver: true,
          }),
        ])
      ).start();
    }, delay);

    return () => clearTimeout(timeout);
  }, []);

  const translateX = animProgress.interpolate({
    inputRange: [0, 1],
    outputRange: [-SCREEN_WIDTH, SCREEN_WIDTH],
  });

  const segmentCount = 20;
  const segmentWidth = SCREEN_WIDTH / segmentCount;
  const ecgPattern = [0, 0, 0, 2, -2, 0, 0, 8, -12, 15, -6, 2, 0, 0, 0, 3, -3, 0, 0, 0];

  return (
    <Animated.View
      style={[
        styles.heartbeatContainer,
        {
          opacity: animOpacity,
          transform: [{ translateX }],
        },
      ]}
    >
      {ecgPattern.map((yOffset, idx) => {
        const nextY = ecgPattern[(idx + 1) % ecgPattern.length] || 0;
        const height = Math.abs(yOffset - nextY) + 2;
        const top = 25 - Math.max(yOffset, nextY);
        return (
          <Animated.View
            key={`ecg-seg-${idx}`}
            style={{
              width: segmentWidth,
              height: Math.max(height, 2),
              backgroundColor: COLORS.medicalGreen,
              position: 'absolute',
              left: idx * segmentWidth,
              top: top,
              borderRadius: 1,
              opacity: animGlow,
            }}
          />
        );
      })}
    </Animated.View>
  );
});

/**
 * LoadingDot - Individual dot in the custom loading indicator
 * Arranged in a circle, each dot pulses with staggered timing
 * 
 * @param {number} index - Dot position in circle
 * @param {number} totalDots - Total dots for angular spacing
 * @param {number} radius - Circle radius
 * @param {number} dotSize - Individual dot size
 * @param {number} delay - Stagger delay
 */
const LoadingDot = React.memo(({ index, totalDots, radius, dotSize, delay }) => {
  const animScale = useRef(new Animated.Value(0.4)).current;
  const animOpacity = useRef(new Animated.Value(0.3)).current;

  useEffect(() => {
    const timeout = setTimeout(() => {
      Animated.loop(
        Animated.sequence([
          Animated.parallel([
            Animated.timing(animScale, {
              toValue: 1.4,
              duration: 500,
              easing: Easing.out(Easing.ease),
              useNativeDriver: true,
            }),
            Animated.timing(animOpacity, {
              toValue: 1,
              duration: 500,
              easing: Easing.out(Easing.ease),
              useNativeDriver: true,
            }),
          ]),
          Animated.parallel([
            Animated.timing(animScale, {
              toValue: 0.4,
              duration: 800,
              easing: Easing.in(Easing.ease),
              useNativeDriver: true,
            }),
            Animated.timing(animOpacity, {
              toValue: 0.3,
              duration: 800,
              easing: Easing.in(Easing.ease),
              useNativeDriver: true,
            }),
          ]),
        ])
      ).start();
    }, delay);

    return () => clearTimeout(timeout);
  }, []);

  const angle = (index / totalDots) * Math.PI * 2;
  const x = Math.cos(angle) * radius;
  const y = Math.sin(angle) * radius;

  return (
    <Animated.View
      style={{
        position: 'absolute',
        width: dotSize,
        height: dotSize,
        borderRadius: dotSize / 2,
        backgroundColor: COLORS.medicalGreenLight,
        left: radius + x - dotSize / 2,
        top: radius + y - dotSize / 2,
        opacity: animOpacity,
        transform: [{ scale: animScale }],
      }}
    />
  );
});

/**
 * MedicalCrossIcon - Animated medical cross/plus symbol
 * Premium quality cross with rounded corners and glow effect
 * Central element of the logo composition
 * 
 * @param {number} size - Cross container size
 * @param {Animated.Value} animScale - Scale animation value
 * @param {Animated.Value} animOpacity - Opacity animation value
 * @param {Animated.Value} animGlow - Glow intensity animation value
 */
const MedicalCrossIcon = React.memo(({ size, animScale, animOpacity, animGlow }) => {
  const crossWidth = size * 0.22;
  const crossHeight = size * 0.62;
  const cornerRadius = crossWidth * 0.25;

  return (
    <Animated.View
      style={[
        styles.medicalCrossContainer,
        {
          width: size,
          height: size,
          opacity: animOpacity,
          transform: [{ scale: animScale }],
        },
      ]}
    >
      {/* Outer glow ring */}
      <Animated.View
        style={[
          styles.crossGlowRing,
          {
            width: size * 1.4,
            height: size * 1.4,
            borderRadius: size * 0.7,
            opacity: animGlow.interpolate({
              inputRange: [0, 1],
              outputRange: [0.05, 0.2],
            }),
          },
        ]}
      />
      {/* Middle glow ring */}
      <Animated.View
        style={[
          styles.crossGlowRing,
          {
            width: size * 1.2,
            height: size * 1.2,
            borderRadius: size * 0.6,
            opacity: animGlow.interpolate({
              inputRange: [0, 1],
              outputRange: [0.1, 0.3],
            }),
          },
        ]}
      />
      {/* Shield/Circle background */}
      <View
        style={[
          styles.crossShieldBg,
          {
            width: size,
            height: size,
            borderRadius: size / 2,
          },
        ]}
      />
      {/* Shield border ring */}
      <View
        style={[
          styles.crossShieldBorder,
          {
            width: size - 4,
            height: size - 4,
            borderRadius: (size - 4) / 2,
          },
        ]}
      />
      {/* Inner shield */}
      <View
        style={[
          styles.crossShieldInner,
          {
            width: size - 10,
            height: size - 10,
            borderRadius: (size - 10) / 2,
          },
        ]}
      />
      {/* Vertical bar of cross */}
      <View
        style={{
          position: 'absolute',
          width: crossWidth,
          height: crossHeight,
          backgroundColor: COLORS.accentWhite,
          borderRadius: cornerRadius,
          top: (size - crossHeight) / 2,
          left: (size - crossWidth) / 2,
        }}
      />
      {/* Horizontal bar of cross */}
      <View
        style={{
          position: 'absolute',
          width: crossHeight,
          height: crossWidth,
          backgroundColor: COLORS.accentWhite,
          borderRadius: cornerRadius,
          top: (size - crossWidth) / 2,
          left: (size - crossHeight) / 2,
        }}
      />
      {/* Cross highlight */}
      <View
        style={{
          position: 'absolute',
          width: crossWidth * 0.4,
          height: crossHeight * 0.3,
          backgroundColor: COLORS.whiteTransparent30,
          borderRadius: cornerRadius * 0.5,
          top: (size - crossHeight) / 2 + crossHeight * 0.1,
          left: (size - crossWidth) / 2 + crossWidth * 0.15,
        }}
      />
      {/* Cross center dot */}
      <View
        style={{
          position: 'absolute',
          width: crossWidth * 0.35,
          height: crossWidth * 0.35,
          backgroundColor: COLORS.medicalGreenLight,
          borderRadius: crossWidth * 0.175,
          top: size / 2 - crossWidth * 0.175,
          left: size / 2 - crossWidth * 0.175,
          opacity: 0.8,
        }}
      />
    </Animated.View>
  );
});

/**
 * CircularProgressRing - Animated progress ring
 * Shows loading progress as a circular arc that fills
 * Uses multiple segments to approximate circular progress
 * 
 * @param {number} size - Ring diameter
 * @param {number} strokeWidth - Ring thickness
 * @param {number} delay - Animation start delay
 * @param {number} duration - Fill animation duration
 */
const CircularProgressRing = React.memo(({ size, strokeWidth, delay, duration }) => {
  const animRotation = useRef(new Animated.Value(0)).current;
  const animOpacity = useRef(new Animated.Value(0)).current;
  const segmentCount = 36;

  useEffect(() => {
    const timeout = setTimeout(() => {
      Animated.timing(animOpacity, {
        toValue: 0.8,
        duration: 600,
        useNativeDriver: true,
      }).start();

      Animated.loop(
        Animated.timing(animRotation, {
          toValue: 1,
          duration: duration,
          easing: Easing.linear,
          useNativeDriver: true,
        })
      ).start();
    }, delay);

    return () => clearTimeout(timeout);
  }, []);

  const rotation = animRotation.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  const segments = [];
  for (let i = 0; i < segmentCount; i++) {
    const angle = (i / segmentCount) * 360;
    const radians = (angle * Math.PI) / 180;
    const x = Math.cos(radians) * (size / 2 - strokeWidth / 2);
    const y = Math.sin(radians) * (size / 2 - strokeWidth / 2);
    const segOpacity = i < segmentCount * 0.7 ? 1 - (i / (segmentCount * 0.7)) * 0.8 : 0.2;

    segments.push(
      <View
        key={`seg-${i}`}
        style={{
          position: 'absolute',
          width: strokeWidth,
          height: strokeWidth,
          borderRadius: strokeWidth / 2,
          backgroundColor: COLORS.medicalGreen,
          left: size / 2 + x - strokeWidth / 2,
          top: size / 2 + y - strokeWidth / 2,
          opacity: segOpacity,
        }}
      />
    );
  }

  return (
    <Animated.View
      style={[
        styles.circularProgress,
        {
          width: size,
          height: size,
          opacity: animOpacity,
          transform: [{ rotate: rotation }],
        },
      ]}
    >
      {segments}
    </Animated.View>
  );
});

/**
 * HexagonPattern - Animated hexagonal grid pattern
 * Creates a subtle tech-inspired background pattern
 * Hexagons fade in and out in sequence for living feel
 * 
 * @param {number} delay - Animation start delay
 * @param {number} rows - Number of hexagon rows
 * @param {number} cols - Number of hexagon columns
 * @param {number} hexSize - Individual hexagon size
 */
const HexagonPattern = React.memo(({ delay, rows, cols, hexSize }) => {
  const hexAnims = useRef(
    Array.from({ length: rows * cols }, () => ({
      opacity: new Animated.Value(0),
      scale: new Animated.Value(0.5),
    }))
  ).current;

  useEffect(() => {
    const timeout = setTimeout(() => {
      hexAnims.forEach((anim, idx) => {
        const hexDelay = idx * 80 + Math.random() * 200;
        Animated.loop(
          Animated.sequence([
            Animated.delay(hexDelay),
            Animated.parallel([
              Animated.timing(anim.opacity, {
                toValue: 0.15 + Math.random() * 0.15,
                duration: 1500,
                easing: Easing.inOut(Easing.ease),
                useNativeDriver: true,
              }),
              Animated.timing(anim.scale, {
                toValue: 1,
                duration: 1500,
                easing: Easing.out(Easing.ease),
                useNativeDriver: true,
              }),
            ]),
            Animated.delay(800 + Math.random() * 1200),
            Animated.parallel([
              Animated.timing(anim.opacity, {
                toValue: 0,
                duration: 1200,
                easing: Easing.inOut(Easing.ease),
                useNativeDriver: true,
              }),
              Animated.timing(anim.scale, {
                toValue: 0.5,
                duration: 1200,
                easing: Easing.in(Easing.ease),
                useNativeDriver: true,
              }),
            ]),
            Animated.delay(500 + Math.random() * 1000),
          ])
        ).start();
      });
    }, delay);

    return () => {};
  }, []);

  return (
    <View style={styles.hexPatternContainer}>
      {hexAnims.map((anim, idx) => {
        const row = Math.floor(idx / cols);
        const col = idx % cols;
        const xOffset = row % 2 === 0 ? 0 : hexSize * 0.5;
        const x = col * hexSize * 1.1 + xOffset;
        const y = row * hexSize * 0.95;
        return (
          <Animated.View
            key={`hex-${idx}`}
            style={{
              position: 'absolute',
              left: x,
              top: y,
              width: hexSize,
              height: hexSize,
              opacity: anim.opacity,
              transform: [{ scale: anim.scale }, { rotate: '30deg' }],
            }}
          >
            <View
              style={{
                width: hexSize * 0.8,
                height: hexSize * 0.8,
                borderWidth: 1,
                borderColor: COLORS.whiteTransparent20,
                backgroundColor: COLORS.whiteTransparent10,
                borderRadius: hexSize * 0.15,
                transform: [{ rotate: '45deg' }],
                position: 'absolute',
                top: hexSize * 0.1,
                left: hexSize * 0.1,
              }}
            />
          </Animated.View>
        );
      })}
    </View>
  );
});

/**
 * MoleculeConnection - Animated molecular bond visualization
 * Shows connected nodes resembling molecular structures
 * Represents the science/pharmacy aspect of the brand
 * 
 * @param {number} delay - Animation start delay
 * @param {Array} nodes - Array of node objects with position, size, color
 */
const MoleculeConnection = React.memo(({ delay, nodes }) => {
  const animOpacity = useRef(new Animated.Value(0)).current;
  const nodeAnims = useRef(
    nodes.map(() => ({
      scale: new Animated.Value(0),
      opacity: new Animated.Value(0),
      glow: new Animated.Value(0.5),
    }))
  ).current;

  useEffect(() => {
    const timeout = setTimeout(() => {
      Animated.timing(animOpacity, {
        toValue: 0.7,
        duration: 1000,
        useNativeDriver: true,
      }).start();

      nodeAnims.forEach((anim, idx) => {
        Animated.sequence([
          Animated.delay(idx * 200),
          Animated.parallel([
            Animated.spring(anim.scale, {
              toValue: 1,
              friction: 4,
              tension: 60,
              useNativeDriver: true,
            }),
            Animated.timing(anim.opacity, {
              toValue: 1,
              duration: 500,
              useNativeDriver: true,
            }),
          ]),
        ]).start();

        Animated.loop(
          Animated.sequence([
            Animated.delay(idx * 300),
            Animated.timing(anim.glow, {
              toValue: 1,
              duration: 1500,
              easing: Easing.inOut(Easing.ease),
              useNativeDriver: true,
            }),
            Animated.timing(anim.glow, {
              toValue: 0.5,
              duration: 1500,
              easing: Easing.inOut(Easing.ease),
              useNativeDriver: true,
            }),
          ])
        ).start();
      });
    }, delay);

    return () => clearTimeout(timeout);
  }, []);

  return (
    <Animated.View style={[styles.moleculeContainer, { opacity: animOpacity }]}>
      {nodes.map((node, idx) => {
        if (idx === 0) return null;
        const prevNode = nodes[idx - 1];
        const dx = node.x - prevNode.x;
        const dy = node.y - prevNode.y;
        const length = Math.sqrt(dx * dx + dy * dy);
        const angle = Math.atan2(dy, dx) * (180 / Math.PI);
        return (
          <View
            key={`conn-${idx}`}
            style={{
              position: 'absolute',
              left: prevNode.x,
              top: prevNode.y,
              width: length,
              height: 1.5,
              backgroundColor: COLORS.whiteTransparent30,
              transform: [{ rotate: `${angle}deg` }],
            }}
          />
        );
      })}
      {nodes.map((node, idx) => (
        <Animated.View
          key={`mol-node-${idx}`}
          style={{
            position: 'absolute',
            left: node.x - node.size / 2,
            top: node.y - node.size / 2,
            width: node.size,
            height: node.size,
            borderRadius: node.size / 2,
            backgroundColor: node.color,
            opacity: nodeAnims[idx].opacity,
            transform: [{ scale: nodeAnims[idx].scale }],
          }}
        >
          <Animated.View
            style={{
              position: 'absolute',
              width: node.size * 2.5,
              height: node.size * 2.5,
              borderRadius: node.size * 1.25,
              backgroundColor: node.color,
              top: -node.size * 0.75,
              left: -node.size * 0.75,
              opacity: nodeAnims[idx].glow.interpolate({
                inputRange: [0.5, 1],
                outputRange: [0.1, 0.25],
              }),
            }}
          />
          <View
            style={{
              position: 'absolute',
              width: node.size * 0.4,
              height: node.size * 0.4,
              borderRadius: node.size * 0.2,
              backgroundColor: COLORS.accentWhite,
              top: node.size * 0.15,
              left: node.size * 0.15,
              opacity: 0.6,
            }}
          />
        </Animated.View>
      ))}
    </Animated.View>
  );
});

/**
 * AnimatedTagline - Letter-by-letter animated text reveal
 * Each letter fades in and slides up individually
 * Creates a premium typewriter-like effect
 * 
 * @param {string} text - The tagline text to animate
 * @param {number} delay - Initial delay before animation starts
 * @param {number} letterInterval - Delay between each letter
 * @param {number} fontSize - Text font size
 */
const AnimatedTagline = React.memo(({ text, delay, letterInterval, fontSize }) => {
  const letterAnims = useRef(
    text.split('').map(() => ({
      opacity: new Animated.Value(0),
      translateY: new Animated.Value(15),
      scale: new Animated.Value(0.5),
    }))
  ).current;

  const underlineWidth = useRef(new Animated.Value(0)).current;
  const underlineOpacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const timeout = setTimeout(() => {
      letterAnims.forEach((anim, idx) => {
        Animated.sequence([
          Animated.delay(idx * letterInterval),
          Animated.parallel([
            Animated.timing(anim.opacity, {
              toValue: 1,
              duration: TIMING.taglineLetterDuration,
              easing: Easing.out(Easing.ease),
              useNativeDriver: true,
            }),
            Animated.timing(anim.translateY, {
              toValue: 0,
              duration: TIMING.taglineLetterDuration,
              easing: Easing.out(Easing.back(1.2)),
              useNativeDriver: true,
            }),
            Animated.timing(anim.scale, {
              toValue: 1,
              duration: TIMING.taglineLetterDuration,
              easing: Easing.out(Easing.ease),
              useNativeDriver: true,
            }),
          ]),
        ]).start();
      });

      const totalLetterTime = text.length * letterInterval + TIMING.taglineLetterDuration;
      Animated.sequence([
        Animated.delay(totalLetterTime + 200),
        Animated.parallel([
          Animated.timing(underlineOpacity, {
            toValue: 0.6,
            duration: 300,
            useNativeDriver: true,
          }),
          Animated.timing(underlineWidth, {
            toValue: 1,
            duration: 800,
            easing: Easing.out(Easing.ease),
            useNativeDriver: true,
          }),
        ]),
      ]).start();
    }, delay);

    return () => clearTimeout(timeout);
  }, []);

  const underlineScaleX = underlineWidth.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 1],
  });

  return (
    <View style={styles.taglineContainer}>
      <View style={styles.taglineLetterRow}>
        {text.split('').map((letter, idx) => (
          <Animated.Text
            key={`letter-${idx}`}
            style={[
              styles.taglineLetter,
              {
                fontSize,
                opacity: letterAnims[idx].opacity,
                transform: [
                  { translateY: letterAnims[idx].translateY },
                  { scale: letterAnims[idx].scale },
                ],
              },
            ]}
          >
            {letter === ' ' ? '\u00A0' : letter}
          </Animated.Text>
        ))}
      </View>
      <Animated.View
        style={[
          styles.taglineUnderline,
          {
            opacity: underlineOpacity,
            transform: [{ scaleX: underlineScaleX }],
          },
        ]}
      />
    </View>
  );
});

// ============================================================
// PREMIUM DECORATION COMPONENTS - Extended Set
// ============================================================

/**
 * ScanLine - Horizontal scanning line effect
 * Moves vertically down the screen like a scanner
 * Creates a futuristic scanning/diagnostic feel
 * 
 * @param {number} delay - Animation start delay in ms
 * @param {number} duration - Full scan cycle duration in ms
 * @param {string} color - Scan line color string
 * @param {number} lineWidth - Width of the scan line
 */
const ScanLine = React.memo(({ delay, duration, color, lineWidth }) => {
  const animPosition = useRef(new Animated.Value(0)).current;
  const animOpacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const timeout = setTimeout(() => {
      // Continuous scanning loop
      Animated.loop(
        Animated.sequence([
          // Fade in at top
          Animated.timing(animOpacity, {
            toValue: 0.4,
            duration: 300,
            useNativeDriver: true,
          }),
          // Move down
          Animated.timing(animPosition, {
            toValue: 1,
            duration: duration,
            easing: Easing.linear,
            useNativeDriver: true,
          }),
          // Fade out at bottom
          Animated.timing(animOpacity, {
            toValue: 0,
            duration: 300,
            useNativeDriver: true,
          }),
          // Reset position
          Animated.timing(animPosition, {
            toValue: 0,
            duration: 0,
            useNativeDriver: true,
          }),
          // Pause before next scan
          Animated.delay(2000),
        ])
      ).start();
    }, delay);

    return () => clearTimeout(timeout);
  }, []);

  const translateY = animPosition.interpolate({
    inputRange: [0, 1],
    outputRange: [-10, SCREEN_HEIGHT + 10],
  });

  return (
    <Animated.View
      style={{
        position: 'absolute',
        left: 0,
        right: 0,
        height: lineWidth,
        backgroundColor: color,
        opacity: animOpacity,
        transform: [{ translateY }],
        zIndex: 2,
        shadowColor: color,
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.8,
        shadowRadius: 15,
        elevation: 5,
      }}
    />
  );
});

/**
 * DiamondParticle - Diamond/rhombus shaped floating particles
 * Rotates and floats upward creating an elegant effect
 * More geometric alternative to circular particles
 * 
 * @param {number} x - Start X position
 * @param {number} y - Start Y position
 * @param {number} size - Diamond size
 * @param {number} delay - Animation start delay
 * @param {string} color - Diamond fill color
 * @param {number} duration - Float animation duration
 */
const DiamondParticle = React.memo(({ x, y, size, delay, color, duration }) => {
  const animOpacity = useRef(new Animated.Value(0)).current;
  const animTranslateY = useRef(new Animated.Value(0)).current;
  const animRotation = useRef(new Animated.Value(0)).current;
  const animScale = useRef(new Animated.Value(0.5)).current;

  useEffect(() => {
    const timeout = setTimeout(() => {
      // Float and fade cycle
      Animated.loop(
        Animated.sequence([
          // Appear
          Animated.parallel([
            Animated.timing(animOpacity, {
              toValue: 0.5,
              duration: duration * 0.15,
              easing: Easing.ease,
              useNativeDriver: true,
            }),
            Animated.spring(animScale, {
              toValue: 1,
              friction: 6,
              tension: 40,
              useNativeDriver: true,
            }),
          ]),
          // Float up
          Animated.parallel([
            Animated.timing(animTranslateY, {
              toValue: -SCREEN_HEIGHT * 0.4,
              duration: duration * 0.7,
              easing: Easing.inOut(Easing.ease),
              useNativeDriver: true,
            }),
            Animated.timing(animRotation, {
              toValue: 1,
              duration: duration * 0.7,
              easing: Easing.linear,
              useNativeDriver: true,
            }),
          ]),
          // Fade out
          Animated.timing(animOpacity, {
            toValue: 0,
            duration: duration * 0.15,
            useNativeDriver: true,
          }),
          // Reset
          Animated.parallel([
            Animated.timing(animTranslateY, {
              toValue: 0,
              duration: 0,
              useNativeDriver: true,
            }),
            Animated.timing(animRotation, {
              toValue: 0,
              duration: 0,
              useNativeDriver: true,
            }),
            Animated.timing(animScale, {
              toValue: 0.5,
              duration: 0,
              useNativeDriver: true,
            }),
          ]),
        ])
      ).start();
    }, delay);

    return () => clearTimeout(timeout);
  }, []);

  const rotation = animRotation.interpolate({
    inputRange: [0, 1],
    outputRange: ['45deg', '405deg'],
  });

  return (
    <Animated.View
      style={{
        position: 'absolute',
        left: x,
        top: y,
        width: size,
        height: size,
        backgroundColor: color,
        opacity: animOpacity,
        transform: [
          { translateY: animTranslateY },
          { rotate: rotation },
          { scale: animScale },
        ],
        shadowColor: color,
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.5,
        shadowRadius: 6,
        elevation: 3,
      }}
    />
  );
});

/**
 * NumberCounter - Animated counting number display
 * Counts from 0 to target value with easing
 * Used for displaying health statistics or metrics
 * 
 * @param {number} targetValue - Number to count up to
 * @param {string} suffix - Text after number (e.g., '%', '+', 'K')
 * @param {string} label - Label text below number
 * @param {number} delay - Animation start delay
 * @param {number} duration - Count animation duration
 * @param {number} x - Position X
 * @param {number} y - Position Y
 */
const NumberCounter = React.memo(({ targetValue, suffix, label, delay, duration, x, y }) => {
  const animOpacity = useRef(new Animated.Value(0)).current;
  const animValue = useRef(new Animated.Value(0)).current;
  const animScale = useRef(new Animated.Value(0.8)).current;
  const [displayValue, setDisplayValue] = React.useState(0);

  useEffect(() => {
    const timeout = setTimeout(() => {
      Animated.parallel([
        Animated.timing(animOpacity, {
          toValue: 0.5,
          duration: 600,
          useNativeDriver: true,
        }),
        Animated.spring(animScale, {
          toValue: 1,
          friction: 5,
          tension: 50,
          useNativeDriver: true,
        }),
      ]).start();

      Animated.timing(animValue, {
        toValue: targetValue,
        duration: duration,
        easing: Easing.out(Easing.ease),
        useNativeDriver: false,
      }).start();

      const listenerId = animValue.addListener(({ value }) => {
        setDisplayValue(Math.round(value));
      });

      return () => {
        animValue.removeListener(listenerId);
      };
    }, delay);

    return () => clearTimeout(timeout);
  }, []);

  return (
    <Animated.View
      style={{
        position: 'absolute',
        left: x,
        top: y,
        alignItems: 'center',
        opacity: animOpacity,
        transform: [{ scale: animScale }],
        zIndex: 15,
      }}
    >
      <Text
        style={{
          fontSize: fontScale(22),
          fontFamily: FONTS.brandName,
          fontWeight: '700',
          color: COLORS.medicalGreenLight,
          textShadowColor: COLORS.shadowGreen,
          textShadowOffset: { width: 0, height: 1 },
          textShadowRadius: 6,
        }}
      >
        {displayValue}{suffix}
      </Text>
      <Text
        style={{
          fontSize: fontScale(8),
          fontFamily: FONTS.tagline,
          color: COLORS.whiteTransparent40,
          letterSpacing: 1,
          marginTop: 2,
          textTransform: 'uppercase',
        }}
      >
        {label}
      </Text>
    </Animated.View>
  );
});

/**
 * BreathingRing - Slowly expanding and contracting ring
 * Creates a zen-like breathing/meditation visual
 * Smooth, calming animation perfect for healthcare apps
 * 
 * @param {number} size - Base ring diameter
 * @param {number} delay - Animation start delay
 * @param {number} breathDuration - Full breath cycle duration
 * @param {string} color - Ring border color
 * @param {number} strokeWidth - Ring border width
 */
const BreathingRing = React.memo(({ size, delay, breathDuration, color, strokeWidth }) => {
  const animScale = useRef(new Animated.Value(0.7)).current;
  const animOpacity = useRef(new Animated.Value(0)).current;
  const animInnerScale = useRef(new Animated.Value(0.5)).current;

  useEffect(() => {
    const timeout = setTimeout(() => {
      // Breathing in and out
      Animated.loop(
        Animated.sequence([
          // Inhale - expand
          Animated.parallel([
            Animated.timing(animScale, {
              toValue: 1.3,
              duration: breathDuration / 2,
              easing: Easing.inOut(Easing.sin),
              useNativeDriver: true,
            }),
            Animated.timing(animOpacity, {
              toValue: 0.5,
              duration: breathDuration / 2,
              easing: Easing.inOut(Easing.sin),
              useNativeDriver: true,
            }),
            Animated.timing(animInnerScale, {
              toValue: 0.9,
              duration: breathDuration / 2,
              easing: Easing.inOut(Easing.sin),
              useNativeDriver: true,
            }),
          ]),
          // Exhale - contract
          Animated.parallel([
            Animated.timing(animScale, {
              toValue: 0.7,
              duration: breathDuration / 2,
              easing: Easing.inOut(Easing.sin),
              useNativeDriver: true,
            }),
            Animated.timing(animOpacity, {
              toValue: 0.15,
              duration: breathDuration / 2,
              easing: Easing.inOut(Easing.sin),
              useNativeDriver: true,
            }),
            Animated.timing(animInnerScale, {
              toValue: 0.5,
              duration: breathDuration / 2,
              easing: Easing.inOut(Easing.sin),
              useNativeDriver: true,
            }),
          ]),
        ])
      ).start();
    }, delay);

    return () => clearTimeout(timeout);
  }, []);

  return (
    <View style={{ position: 'absolute', top: SCREEN_HEIGHT * 0.28, alignSelf: 'center', width: size, height: size, alignItems: 'center', justifyContent: 'center', zIndex: 8 }}>
      {/* Outer breathing ring */}
      <Animated.View
        style={{
          position: 'absolute',
          width: size,
          height: size,
          borderRadius: size / 2,
          borderWidth: strokeWidth,
          borderColor: color,
          backgroundColor: 'transparent',
          opacity: animOpacity,
          transform: [{ scale: animScale }],
        }}
      />
      {/* Inner breathing ring */}
      <Animated.View
        style={{
          position: 'absolute',
          width: size * 0.6,
          height: size * 0.6,
          borderRadius: size * 0.3,
          borderWidth: strokeWidth * 0.7,
          borderColor: color,
          backgroundColor: 'transparent',
          opacity: animOpacity,
          transform: [{ scale: animInnerScale }],
        }}
      />
    </View>
  );
});

/**
 * StatusBadge - Animated status notification badge
 * Shows a pulsing badge like 'Connected' or 'Active'
 * Conveys system status in a premium way
 * 
 * @param {string} text - Badge text
 * @param {number} delay - Animation delay
 * @param {number} x - Position X
 * @param {number} y - Position Y
 * @param {string} dotColor - Status dot color
 */
const StatusBadge = React.memo(({ text, delay, x, y, dotColor }) => {
  const animOpacity = useRef(new Animated.Value(0)).current;
  const animTranslateX = useRef(new Animated.Value(30)).current;
  const animDotPulse = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    const timeout = setTimeout(() => {
      Animated.parallel([
        Animated.timing(animOpacity, {
          toValue: 0.6,
          duration: 800,
          easing: Easing.ease,
          useNativeDriver: true,
        }),
        Animated.timing(animTranslateX, {
          toValue: 0,
          duration: 800,
          easing: Easing.out(Easing.back(1.2)),
          useNativeDriver: true,
        }),
      ]).start();

      // Pulsing dot
      Animated.loop(
        Animated.sequence([
          Animated.timing(animDotPulse, {
            toValue: 1.5,
            duration: 800,
            easing: Easing.inOut(Easing.ease),
            useNativeDriver: true,
          }),
          Animated.timing(animDotPulse, {
            toValue: 1,
            duration: 800,
            easing: Easing.inOut(Easing.ease),
            useNativeDriver: true,
          }),
        ])
      ).start();
    }, delay);

    return () => clearTimeout(timeout);
  }, []);

  return (
    <Animated.View
      style={{
        position: 'absolute',
        left: x,
        top: y,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: COLORS.whiteTransparent10,
        paddingHorizontal: moderateScale(12),
        paddingVertical: moderateScale(6),
        borderRadius: moderateScale(20),
        borderWidth: 1,
        borderColor: COLORS.whiteTransparent15,
        opacity: animOpacity,
        transform: [{ translateX: animTranslateX }],
        zIndex: 18,
      }}
    >
      {/* Status dot */}
      <Animated.View
        style={{
          width: moderateScale(6),
          height: moderateScale(6),
          borderRadius: moderateScale(3),
          backgroundColor: dotColor,
          marginRight: moderateScale(6),
          transform: [{ scale: animDotPulse }],
          shadowColor: dotColor,
          shadowOffset: { width: 0, height: 0 },
          shadowOpacity: 0.6,
          shadowRadius: 4,
        }}
      />
      <Text
        style={{
          fontSize: fontScale(9),
          fontFamily: FONTS.version,
          color: COLORS.whiteTransparent60,
          letterSpacing: 0.5,
        }}
      >
        {text}
      </Text>
    </Animated.View>
  );
});

/**
 * GradientBar - Animated horizontal bar with gradient effect
 * Fills from left to right with a premium glow
 * Used for progress/loading bars and decorative elements
 * 
 * @param {number} x - Position X
 * @param {number} y - Position Y
 * @param {number} width - Bar total width
 * @param {number} height - Bar height
 * @param {number} delay - Animation delay
 * @param {number} duration - Fill animation duration
 * @param {string} startColor - Gradient start color
 * @param {string} endColor - Gradient end color
 */
const GradientBar = React.memo(({ x, y, width: barWidth, height: barHeight, delay, duration, startColor, endColor }) => {
  const animOpacity = useRef(new Animated.Value(0)).current;
  const animFillWidth = useRef(new Animated.Value(0)).current;
  const animGlowOpacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const timeout = setTimeout(() => {
      Animated.timing(animOpacity, {
        toValue: 0.5,
        duration: 600,
        useNativeDriver: false,
      }).start();

      Animated.timing(animFillWidth, {
        toValue: 1,
        duration: duration,
        easing: Easing.inOut(Easing.ease),
        useNativeDriver: false,
      }).start();

      // Glow pulse
      Animated.loop(
        Animated.sequence([
          Animated.timing(animGlowOpacity, {
            toValue: 0.8,
            duration: 1500,
            easing: Easing.inOut(Easing.ease),
            useNativeDriver: false,
          }),
          Animated.timing(animGlowOpacity, {
            toValue: 0.2,
            duration: 1500,
            easing: Easing.inOut(Easing.ease),
            useNativeDriver: false,
          }),
        ])
      ).start();
    }, delay);

    return () => clearTimeout(timeout);
  }, []);

  const fillW = animFillWidth.interpolate({
    inputRange: [0, 1],
    outputRange: [0, barWidth],
  });

  return (
    <Animated.View
      style={{
        position: 'absolute',
        left: x,
        top: y,
        width: barWidth,
        height: barHeight,
        borderRadius: barHeight / 2,
        backgroundColor: COLORS.whiteTransparent10,
        opacity: animOpacity,
        overflow: 'hidden',
        zIndex: 12,
      }}
    >
      {/* Fill bar */}
      <Animated.View
        style={{
          width: fillW,
          height: barHeight,
          borderRadius: barHeight / 2,
          backgroundColor: startColor,
        }}
      >
        {/* Glow effect on tip */}
        <Animated.View
          style={{
            position: 'absolute',
            right: 0,
            top: -barHeight,
            width: barHeight * 3,
            height: barHeight * 3,
            borderRadius: barHeight * 1.5,
            backgroundColor: endColor,
            opacity: animGlowOpacity,
          }}
        />
      </Animated.View>
    </Animated.View>
  );
});

/**
 * FloatingText - Text that floats upward and fades
 * Creates a dynamic information display effect
 * Used to show health terms, features, or benefits
 * 
 * @param {string} text - Text to display
 * @param {number} x - Start X position
 * @param {number} y - Start Y position
 * @param {number} delay - Animation delay
 * @param {number} fontSize - Text font size
 */
const FloatingText = React.memo(({ text, x, y, delay, fontSize: fSize }) => {
  const animOpacity = useRef(new Animated.Value(0)).current;
  const animTranslateY = useRef(new Animated.Value(20)).current;

  useEffect(() => {
    const timeout = setTimeout(() => {
      Animated.loop(
        Animated.sequence([
          // Fade in and rise
          Animated.parallel([
            Animated.timing(animOpacity, {
              toValue: 0.4,
              duration: 1200,
              easing: Easing.ease,
              useNativeDriver: true,
            }),
            Animated.timing(animTranslateY, {
              toValue: -30,
              duration: 3000,
              easing: Easing.out(Easing.ease),
              useNativeDriver: true,
            }),
          ]),
          // Fade out
          Animated.timing(animOpacity, {
            toValue: 0,
            duration: 800,
            useNativeDriver: true,
          }),
          // Reset
          Animated.timing(animTranslateY, {
            toValue: 20,
            duration: 0,
            useNativeDriver: true,
          }),
          Animated.delay(1000 + Math.random() * 2000),
        ])
      ).start();
    }, delay);

    return () => clearTimeout(timeout);
  }, []);

  return (
    <Animated.View
      style={{
        position: 'absolute',
        left: x,
        top: y,
        opacity: animOpacity,
        transform: [{ translateY: animTranslateY }],
        zIndex: 14,
      }}
    >
      <Text
        style={{
          fontSize: fSize,
          fontFamily: FONTS.tagline,
          color: COLORS.whiteTransparent30,
          letterSpacing: 1,
        }}
      >
        {text}
      </Text>
    </Animated.View>
  );
});

/**
 * OrbitingDot - Single dot orbiting around a center point
 * Creates satellite-like orbiting motion
 * Used as standalone decorative element
 * 
 * @param {number} centerX - Orbit center X
 * @param {number} centerY - Orbit center Y
 * @param {number} orbitRadius - Orbit radius
 * @param {number} dotSize - Dot diameter
 * @param {number} delay - Animation delay
 * @param {number} duration - Full orbit duration
 * @param {string} color - Dot color
 * @param {number} startAngle - Initial angle in degrees
 */
const OrbitingDot = React.memo(({ centerX, centerY, orbitRadius, dotSize, delay, duration, color, startAngle }) => {
  const animProgress = useRef(new Animated.Value(0)).current;
  const animOpacity = useRef(new Animated.Value(0)).current;
  const [position, setPosition] = React.useState({ x: 0, y: 0 });

  useEffect(() => {
    const timeout = setTimeout(() => {
      Animated.timing(animOpacity, {
        toValue: 0.6,
        duration: 1000,
        useNativeDriver: true,
      }).start();

      Animated.loop(
        Animated.timing(animProgress, {
          toValue: 1,
          duration: duration,
          easing: Easing.linear,
          useNativeDriver: false,
        })
      ).start();

      const listenerId = animProgress.addListener(({ value }) => {
        const angle = (startAngle + value * 360) * (Math.PI / 180);
        setPosition({
          x: centerX + Math.cos(angle) * orbitRadius - dotSize / 2,
          y: centerY + Math.sin(angle) * orbitRadius - dotSize / 2,
        });
      });

      return () => {
        animProgress.removeListener(listenerId);
      };
    }, delay);

    return () => clearTimeout(timeout);
  }, []);

  return (
    <Animated.View
      style={{
        position: 'absolute',
        left: position.x,
        top: position.y,
        width: dotSize,
        height: dotSize,
        borderRadius: dotSize / 2,
        backgroundColor: color,
        opacity: animOpacity,
        shadowColor: color,
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.7,
        shadowRadius: 5,
        elevation: 3,
        zIndex: 10,
      }}
    />
  );
});


// ============================================================
// MAIN SPLASH SCREEN COMPONENT
// ============================================================

/**
 * SplashScreen - Main splash screen component
 * Orchestrates all animations across 6 phases over 10 seconds
 * Manages animation lifecycle and cleanup
 * Calls onFinish callback when splash animation completes
 * 
 * @param {Function} onFinish - Callback when splash screen completes
 */
const SplashScreen = ({ onFinish }) => {
  // ============================================================
  // ANIMATION STATE REFS
  // ============================================================

  // Phase 1: Background & ambient
  const backgroundOpacity = useRef(new Animated.Value(0)).current;
  const ambientGlow1 = useRef(new Animated.Value(0)).current;
  const ambientGlow2 = useRef(new Animated.Value(0)).current;

  // Phase 2: Logo entrance
  const logoScale = useRef(new Animated.Value(0.3)).current;
  const logoOpacity = useRef(new Animated.Value(0)).current;
  const logoRotation = useRef(new Animated.Value(0)).current;
  const logoGlow = useRef(new Animated.Value(0)).current;
  const logoShineX = useRef(new Animated.Value(-1)).current;

  // Phase 3: Brand name & tagline
  const brandNameOpacity = useRef(new Animated.Value(0)).current;
  const brandNameTranslateY = useRef(new Animated.Value(30)).current;
  const brandNameScale = useRef(new Animated.Value(0.8)).current;
  const brandNameLetterSpacing = useRef(new Animated.Value(0)).current;

  // Phase 4: Decorative elements
  const decorativeOpacity = useRef(new Animated.Value(0)).current;
  const heartbeatOpacity = useRef(new Animated.Value(0)).current;

  // Phase 5: Loading indicator
  const loadingOpacity = useRef(new Animated.Value(0)).current;
  const loadingScale = useRef(new Animated.Value(0.5)).current;
  const loadingRotation = useRef(new Animated.Value(0)).current;
  const loadingTextOpacity = useRef(new Animated.Value(0)).current;
  const progressValue = useRef(new Animated.Value(0)).current;

  // Phase 6: Exit animation
  const exitOpacity = useRef(new Animated.Value(1)).current;
  const exitScale = useRef(new Animated.Value(1)).current;

  // Version text
  const versionOpacity = useRef(new Animated.Value(0)).current;

  // ============================================================
  // MEMOIZED DATA ARRAYS
  // ============================================================

  /**
   * Generate particle data for the floating particle system
   * 65 particles with randomized positions, sizes, speeds, and colors
   */
  const particleData = useMemo(() => {
    const particles = [];
    const particleColors = [
      COLORS.whiteTransparent30,
      COLORS.whiteTransparent20,
      COLORS.medicalGreenGlow,
      COLORS.blueGlow,
      COLORS.whiteTransparent15,
      COLORS.greenGlow,
      COLORS.cyanGlow,
      COLORS.whiteTransparent40,
    ];
    for (let i = 0; i < LAYOUT.particleCount; i++) {
      particles.push({
        index: i,
        delay: TIMING.particleSystemStart + Math.random() * 3000,
        size: LAYOUT.particleMinSize + Math.random() * (LAYOUT.particleMaxSize - LAYOUT.particleMinSize),
        startX: Math.random() * SCREEN_WIDTH,
        startY: SCREEN_HEIGHT * 0.3 + Math.random() * SCREEN_HEIGHT * 0.7,
        duration: 6000 + Math.random() * 8000,
        color: particleColors[Math.floor(Math.random() * particleColors.length)],
        opacity: 0.2 + Math.random() * 0.5,
        swayAmount: 15 + Math.random() * 40,
      });
    }
    return particles;
  }, []);

  /**
   * Generate sparkle data for twinkling star effects
   * 20 sparkles distributed across the screen
   */
  const sparkleData = useMemo(() => {
    const sparkles = [];
    for (let i = 0; i < LAYOUT.sparkleCount; i++) {
      sparkles.push({
        x: Math.random() * SCREEN_WIDTH * 0.9 + SCREEN_WIDTH * 0.05,
        y: Math.random() * SCREEN_HEIGHT * 0.7 + SCREEN_HEIGHT * 0.05,
        size: LAYOUT.sparkleMinSize + Math.random() * (LAYOUT.sparkleMaxSize - LAYOUT.sparkleMinSize),
        delay: 1000 + Math.random() * 4000,
        duration: 1500 + Math.random() * 2500,
      });
    }
    return sparkles;
  }, []);

  /**
   * Generate DNA helix node data
   * 24 nodes on each side of the double helix
   */
  const dnaNodesData = useMemo(() => {
    const nodes = [];
    for (let i = 0; i < LAYOUT.dnaNodeCount; i++) {
      nodes.push({
        index: i,
        delay: TIMING.dnaHelixDelay + i * 80,
      });
    }
    return nodes;
  }, []);

  /**
   * Orbital ring configuration data
   * 3 rings at different sizes, angles, and speeds
   */
  const orbitalRingsData = useMemo(() => [
    {
      size: LAYOUT.orbitalRingBaseSize,
      delay: TIMING.orbitalRingDelay,
      duration: TIMING.orbitalRingDuration,
      color: COLORS.whiteTransparent20,
      tiltAngle: 65,
      dotSize: moderateScale(5),
    },
    {
      size: LAYOUT.orbitalRingBaseSize + LAYOUT.orbitalRingSizeIncrement,
      delay: TIMING.orbitalRingDelay + 400,
      duration: TIMING.orbitalRingDuration * 0.8,
      color: COLORS.whiteTransparent15,
      tiltAngle: 45,
      dotSize: moderateScale(4),
    },
    {
      size: LAYOUT.orbitalRingBaseSize + LAYOUT.orbitalRingSizeIncrement * 2,
      delay: TIMING.orbitalRingDelay + 800,
      duration: TIMING.orbitalRingDuration * 1.2,
      color: COLORS.whiteTransparent10,
      tiltAngle: 25,
      dotSize: moderateScale(3),
    },
  ], []);

  /**
   * Pulse ring stagger data
   * 4 rings with increasing delays for cascading effect
   */
  const pulseRingsData = useMemo(() => {
    const rings = [];
    for (let i = 0; i < LAYOUT.pulseRingCount; i++) {
      rings.push({
        delay: TIMING.pulseRingDelay + i * (TIMING.pulseRingInterval / LAYOUT.pulseRingCount),
        size: LAYOUT.pulseRingBaseSize,
        color: i % 2 === 0 ? COLORS.medicalGreenLight : COLORS.primarySkyBlue,
        duration: TIMING.pulseRingInterval,
        maxScale: 2.5 + i * 0.3,
      });
    }
    return rings;
  }, []);

  /**
   * Wave layer data
   * 5 waves at different depths and speeds
   */
  const wavesData = useMemo(() => {
    const waves = [];
    const waveColors = [
      COLORS.whiteTransparent10,
      COLORS.medicalGreenGlow,
      COLORS.whiteTransparent15,
      COLORS.blueGlow,
      COLORS.whiteTransparent10,
    ];
    for (let i = 0; i < LAYOUT.waveCount; i++) {
      waves.push({
        index: i,
        delay: TIMING.waveAnimDelay + i * 300,
        color: waveColors[i],
        amplitude: LAYOUT.waveBaseHeight - i * 8,
        speed: TIMING.waveAnimDuration + i * 500,
      });
    }
    return waves;
  }, []);

  /**
   * Glow orb configuration
   * Ambient light sources positioned around the screen
   */
  const glowOrbsData = useMemo(() => [
    {
      x: SCREEN_WIDTH * 0.2,
      y: SCREEN_HEIGHT * 0.15,
      size: moderateScale(200),
      color: COLORS.blueGlow,
      delay: TIMING.ambientGlowStart,
      duration: 4000,
    },
    {
      x: SCREEN_WIDTH * 0.8,
      y: SCREEN_HEIGHT * 0.3,
      size: moderateScale(180),
      color: COLORS.greenGlow,
      delay: TIMING.ambientGlowStart + 500,
      duration: 3500,
    },
    {
      x: SCREEN_WIDTH * 0.5,
      y: SCREEN_HEIGHT * 0.7,
      size: moderateScale(220),
      color: COLORS.cyanGlow,
      delay: TIMING.ambientGlowStart + 1000,
      duration: 5000,
    },
    {
      x: SCREEN_WIDTH * 0.15,
      y: SCREEN_HEIGHT * 0.85,
      size: moderateScale(160),
      color: COLORS.blueGlow,
      delay: TIMING.ambientGlowStart + 800,
      duration: 4500,
    },
    {
      x: SCREEN_WIDTH * 0.9,
      y: SCREEN_HEIGHT * 0.6,
      size: moderateScale(140),
      color: COLORS.greenGlow,
      delay: TIMING.ambientGlowStart + 1200,
      duration: 3800,
    },
  ], []);

  /**
   * Shimmer line configuration
   * Diagonal light sweeps across the screen
   */
  const shimmerLinesData = useMemo(() => [
    { delay: 2000, y: SCREEN_HEIGHT * 0.25, width: SCREEN_WIDTH * 0.6, angle: -15 },
    { delay: 3500, y: SCREEN_HEIGHT * 0.45, width: SCREEN_WIDTH * 0.5, angle: -20 },
    { delay: 5000, y: SCREEN_HEIGHT * 0.65, width: SCREEN_WIDTH * 0.7, angle: -10 },
    { delay: 6500, y: SCREEN_HEIGHT * 0.35, width: SCREEN_WIDTH * 0.4, angle: -25 },
  ], []);

  /**
   * Molecule node data for molecular bond visualization
   * Positioned in top-right and bottom-left areas
   */
  const moleculeNodesTopRight = useMemo(() => [
    { x: SCREEN_WIDTH * 0.7, y: SCREEN_HEIGHT * 0.08, size: moderateScale(8), color: COLORS.medicalGreenBright },
    { x: SCREEN_WIDTH * 0.82, y: SCREEN_HEIGHT * 0.12, size: moderateScale(6), color: COLORS.primarySkyBlue },
    { x: SCREEN_WIDTH * 0.88, y: SCREEN_HEIGHT * 0.06, size: moderateScale(10), color: COLORS.medicalGreenLight },
    { x: SCREEN_WIDTH * 0.95, y: SCREEN_HEIGHT * 0.14, size: moderateScale(5), color: COLORS.primaryBabyBlue },
    { x: SCREEN_WIDTH * 0.78, y: SCREEN_HEIGHT * 0.18, size: moderateScale(7), color: COLORS.medicalGreenBright },
  ], []);

  const moleculeNodesBottomLeft = useMemo(() => [
    { x: SCREEN_WIDTH * 0.05, y: SCREEN_HEIGHT * 0.78, size: moderateScale(7), color: COLORS.primarySkyBlue },
    { x: SCREEN_WIDTH * 0.15, y: SCREEN_HEIGHT * 0.82, size: moderateScale(9), color: COLORS.medicalGreenLight },
    { x: SCREEN_WIDTH * 0.08, y: SCREEN_HEIGHT * 0.88, size: moderateScale(6), color: COLORS.primaryBabyBlue },
    { x: SCREEN_WIDTH * 0.22, y: SCREEN_HEIGHT * 0.85, size: moderateScale(8), color: COLORS.medicalGreenBright },
    { x: SCREEN_WIDTH * 0.28, y: SCREEN_HEIGHT * 0.79, size: moderateScale(5), color: COLORS.primarySkyBlue },
  ], []);

  /**
   * Loading dots configuration
   * 12 dots arranged in a circle with staggered animation
   */
  const loadingDotsData = useMemo(() => {
    const dots = [];
    for (let i = 0; i < LAYOUT.loadingDotCount; i++) {
      dots.push({
        index: i,
        totalDots: LAYOUT.loadingDotCount,
        radius: LAYOUT.loadingRingSize / 2,
        dotSize: LAYOUT.loadingDotSize,
        delay: TIMING.loadingDelay + i * 100,
      });
    }
    return dots;
  }, []);

  // ============================================================
  // ANIMATION ORCHESTRATION
  // ============================================================

  useEffect(() => {
    // ---- PHASE 1: Background & ambient effects (0-2s) ----
    Animated.timing(backgroundOpacity, {
      toValue: 1,
      duration: TIMING.backgroundFadeIn,
      easing: Easing.ease,
      useNativeDriver: true,
    }).start();

    // ---- PHASE 2: Logo entrance (1.5-4s) ----
    const logoTimeout = setTimeout(() => {
      // Logo fade in and scale up
      Animated.parallel([
        Animated.timing(logoOpacity, {
          toValue: 1,
          duration: TIMING.logoFadeInDuration,
          easing: Easing.out(Easing.ease),
          useNativeDriver: true,
        }),
        Animated.spring(logoScale, {
          toValue: 1,
          friction: 6,
          tension: 40,
          useNativeDriver: true,
        }),
        // Subtle rotation on entrance
        Animated.timing(logoRotation, {
          toValue: 1,
          duration: TIMING.logoScaleUpDuration,
          easing: Easing.out(Easing.ease),
          useNativeDriver: true,
        }),
      ]).start();

      // Logo glow pulsing (continuous)
      Animated.loop(
        Animated.sequence([
          Animated.timing(logoGlow, {
            toValue: 1,
            duration: TIMING.logoGlowPulseDuration,
            easing: Easing.inOut(Easing.ease),
            useNativeDriver: true,
          }),
          Animated.timing(logoGlow, {
            toValue: 0,
            duration: TIMING.logoGlowPulseDuration,
            easing: Easing.inOut(Easing.ease),
            useNativeDriver: true,
          }),
        ])
      ).start();

      // Logo shine sweep
      Animated.loop(
        Animated.sequence([
          Animated.timing(logoShineX, {
            toValue: 2,
            duration: 3000,
            easing: Easing.inOut(Easing.ease),
            useNativeDriver: true,
          }),
          Animated.delay(2000),
          Animated.timing(logoShineX, {
            toValue: -1,
            duration: 0,
            useNativeDriver: true,
          }),
        ])
      ).start();
    }, TIMING.logoFadeInDelay);

    // ---- PHASE 3: Brand name & tagline (3-6s) ----
    const brandTimeout = setTimeout(() => {
      Animated.parallel([
        Animated.timing(brandNameOpacity, {
          toValue: 1,
          duration: TIMING.brandNameDuration,
          easing: Easing.out(Easing.ease),
          useNativeDriver: true,
        }),
        Animated.timing(brandNameTranslateY, {
          toValue: 0,
          duration: TIMING.brandNameDuration,
          easing: Easing.out(Easing.back(1.2)),
          useNativeDriver: true,
        }),
        Animated.timing(brandNameScale, {
          toValue: 1,
          duration: TIMING.brandNameDuration * 1.2,
          easing: Easing.out(Easing.ease),
          useNativeDriver: true,
        }),
      ]).start();
    }, TIMING.brandNameDelay);

    // ---- PHASE 4: Decorative elements (2-7s) ----
    const decorTimeout = setTimeout(() => {
      Animated.timing(decorativeOpacity, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }).start();
    }, TIMING.dnaHelixDelay);

    // Heartbeat line
    const heartbeatTimeout = setTimeout(() => {
      Animated.timing(heartbeatOpacity, {
        toValue: 0.6,
        duration: 800,
        useNativeDriver: true,
      }).start();
    }, 2500);

    // Version text
    const versionTimeout = setTimeout(() => {
      Animated.timing(versionOpacity, {
        toValue: 0.5,
        duration: 800,
        useNativeDriver: true,
      }).start();
    }, 5500);

    // ---- PHASE 5: Loading indicator (5-9s) ----
    const loadingTimeout = setTimeout(() => {
      Animated.parallel([
        Animated.timing(loadingOpacity, {
          toValue: 1,
          duration: TIMING.loadingFadeIn,
          useNativeDriver: true,
        }),
        Animated.spring(loadingScale, {
          toValue: 1,
          friction: 5,
          tension: 50,
          useNativeDriver: true,
        }),
      ]).start();

      // Loading text
      Animated.timing(loadingTextOpacity, {
        toValue: 0.8,
        duration: 800,
        delay: 400,
        useNativeDriver: true,
      }).start();

      // Loading rotation
      Animated.loop(
        Animated.timing(loadingRotation, {
          toValue: 1,
          duration: TIMING.loadingRotationDuration,
          easing: Easing.linear,
          useNativeDriver: true,
        })
      ).start();

      // Progress from 0 to 1
      Animated.timing(progressValue, {
        toValue: 1,
        duration: TIMING.loadingProgressDuration,
        easing: Easing.inOut(Easing.ease),
        useNativeDriver: true,
      }).start();
    }, TIMING.loadingDelay);

    // ---- PHASE 6: Exit animation (9-10s) ----
    const exitTimeout = setTimeout(() => {
      Animated.parallel([
        Animated.timing(exitOpacity, {
          toValue: 0,
          duration: TIMING.exitFadeOutDuration,
          easing: Easing.in(Easing.ease),
          useNativeDriver: true,
        }),
        Animated.timing(exitScale, {
          toValue: 1.15,
          duration: TIMING.exitScaleUpDuration,
          easing: Easing.in(Easing.ease),
          useNativeDriver: true,
        }),
      ]).start();
    }, TIMING.exitFadeOutStart);

    // ---- Call onFinish after splash duration ----
    const finishTimeout = setTimeout(() => {
      if (onFinish) {
        onFinish();
      }
    }, TIMING.splashDuration);

    // Cleanup all timeouts
    return () => {
      clearTimeout(logoTimeout);
      clearTimeout(brandTimeout);
      clearTimeout(decorTimeout);
      clearTimeout(heartbeatTimeout);
      clearTimeout(versionTimeout);
      clearTimeout(loadingTimeout);
      clearTimeout(exitTimeout);
      clearTimeout(finishTimeout);
    };
  }, [onFinish]);

  // ============================================================
  // INTERPOLATIONS
  // ============================================================

  const logoRotateInterpolation = logoRotation.interpolate({
    inputRange: [0, 1],
    outputRange: ['-10deg', '0deg'],
  });

  const loadingRotateInterpolation = loadingRotation.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  // ============================================================
  // RENDER
  // ============================================================

  return (
    <Animated.View
      style={[
        styles.container,
        {
          opacity: exitOpacity,
          transform: [{ scale: exitScale }],
        },
      ]}
    >
      <StatusBar translucent backgroundColor='transparent' barStyle='light-content' />

      {/* ============================================================ */}
      {/* LAYER 1: GRADIENT BACKGROUND */}
      {/* ============================================================ */}
      <Animated.View style={[styles.backgroundLayer, { opacity: backgroundOpacity }]}>
        <LinearGradient
          colors={[
            COLORS.gradientStart,
            COLORS.gradientMid1,
            COLORS.gradientMid2,
            COLORS.gradientMid3,
            COLORS.gradientEnd,
          ]}
          locations={[0, 0.25, 0.5, 0.75, 1]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.gradient}
        />
      </Animated.View>

      {/* ============================================================ */}
      {/* LAYER 2: AMBIENT GLOW ORBS */}
      {/* ============================================================ */}
      <View style={styles.ambientLayer}>
        {glowOrbsData.map((orb, idx) => (
          <GlowOrb key={`glow-orb-${idx}`} {...orb} />
        ))}
      </View>

      {/* ============================================================ */}
      {/* LAYER 3: HEXAGON PATTERN */}
      {/* ============================================================ */}
      <HexagonPattern
        delay={1500}
        rows={8}
        cols={6}
        hexSize={moderateScale(45)}
      />

      {/* ============================================================ */}
      {/* LAYER 4: FLOATING PARTICLES */}
      {/* ============================================================ */}
      <View style={styles.particleLayer}>
        {particleData.map((particle) => (
          <FloatingParticle key={`particle-${particle.index}`} {...particle} />
        ))}
      </View>

      {/* ============================================================ */}
      {/* LAYER 5: SPARKLE EFFECTS */}
      {/* ============================================================ */}
      <View style={styles.sparkleLayer}>
        {sparkleData.map((sparkle, idx) => (
          <SparkleEffect key={`sparkle-${idx}`} {...sparkle} />
        ))}
      </View>

      {/* ============================================================ */}
      {/* LAYER 6: SHIMMER LINES */}
      {/* ============================================================ */}
      <View style={styles.shimmerLayer}>
        {shimmerLinesData.map((shimmer, idx) => (
          <ShimmerLine key={`shimmer-${idx}`} {...shimmer} />
        ))}
      </View>

      {/* ============================================================ */}
      {/* LAYER 7: WAVE ANIMATIONS */}
      {/* ============================================================ */}
      <View style={styles.waveLayer}>
        {wavesData.map((wave, idx) => (
          <WaveAnimation key={`wave-${idx}`} {...wave} />
        ))}
      </View>

      {/* ============================================================ */}
      {/* LAYER 8: HEARTBEAT LINE */}
      {/* ============================================================ */}
      <Animated.View style={[styles.heartbeatLayer, { opacity: heartbeatOpacity }]}>
        <HeartbeatLine delay={2500} />
      </Animated.View>

      {/* ============================================================ */}
      {/* LAYER 9: DNA HELIX */}
      {/* ============================================================ */}
      <Animated.View style={[styles.dnaHelixContainer, { opacity: decorativeOpacity }]}>
        {/* Left strand */}
        <View style={styles.dnaHelixStrand}>
          {dnaNodesData.map((node) => (
            <DNAHelixNode
              key={`dna-left-${node.index}`}
              index={node.index}
              totalNodes={LAYOUT.dnaNodeCount}
              delay={node.delay}
              side='left'
              helixWidth={LAYOUT.dnaHelixWidth}
              helixHeight={LAYOUT.dnaHelixHeight}
            />
          ))}
        </View>
        {/* Right strand */}
        <View style={styles.dnaHelixStrand}>
          {dnaNodesData.map((node) => (
            <DNAHelixNode
              key={`dna-right-${node.index}`}
              index={node.index}
              totalNodes={LAYOUT.dnaNodeCount}
              delay={node.delay + 100}
              side='right'
              helixWidth={LAYOUT.dnaHelixWidth}
              helixHeight={LAYOUT.dnaHelixHeight}
            />
          ))}
        </View>
      </Animated.View>

      {/* ============================================================ */}
      {/* LAYER 10: MOLECULE CONNECTIONS */}
      {/* ============================================================ */}
      <MoleculeConnection delay={3000} nodes={moleculeNodesTopRight} />
      <MoleculeConnection delay={3500} nodes={moleculeNodesBottomLeft} />

      {/* ============================================================ */}
      {/* LAYER 11: PULSE RINGS */}
      {/* ============================================================ */}
      <View style={styles.pulseRingContainer}>
        {pulseRingsData.map((ring, idx) => (
          <PulseRing key={`pulse-ring-${idx}`} {...ring} />
        ))}
      </View>

      {/* ============================================================ */}
      {/* LAYER 12: ORBITAL RINGS */}
      {/* ============================================================ */}
      <View style={styles.orbitalContainer}>
        {orbitalRingsData.map((ring, idx) => (
          <OrbitalRing key={`orbital-ring-${idx}`} {...ring} />
        ))}
      </View>

      {/* ============================================================ */}
      {/* LAYER 13: LOGO */}
      {/* ============================================================ */}
      <View style={styles.logoSection}>
        <MedicalCrossIcon
          size={LAYOUT.logoContainerSize}
          animScale={logoScale}
          animOpacity={logoOpacity}
          animGlow={logoGlow}
        />
      </View>

      {/* ============================================================ */}
      {/* LAYER 14: BRAND NAME */}
      {/* ============================================================ */}
      <Animated.View
        style={[
          styles.brandNameContainer,
          {
            opacity: brandNameOpacity,
            transform: [
              { translateY: brandNameTranslateY },
              { scale: brandNameScale },
            ],
          },
        ]}
      >
        <Text style={styles.brandNameText}>S-Pharma</Text>
        <View style={styles.brandNameUnderline} />
      </Animated.View>

      {/* ============================================================ */}
      {/* LAYER 15: TAGLINE */}
      {/* ============================================================ */}
      <AnimatedTagline
        text='Your Smart Health Partner'
        delay={TIMING.taglineDelay}
        letterInterval={TIMING.taglineLetterInterval}
        fontSize={LAYOUT.taglineFontSize}
      />

      {/* ============================================================ */}
      {/* LAYER 16: LOADING INDICATOR */}
      {/* ============================================================ */}
      <Animated.View
        style={[
          styles.loadingSection,
          {
            opacity: loadingOpacity,
            transform: [{ scale: loadingScale }],
          },
        ]}
      >
        {/* Circular loading dots */}
        <Animated.View
          style={[
            styles.loadingDotsContainer,
            {
              width: LAYOUT.loadingRingSize,
              height: LAYOUT.loadingRingSize,
              transform: [{ rotate: loadingRotateInterpolation }],
            },
          ]}
        >
          {loadingDotsData.map((dot) => (
            <LoadingDot key={`loading-dot-${dot.index}`} {...dot} />
          ))}
        </Animated.View>

        {/* Circular progress ring */}
        <CircularProgressRing
          size={moderateScale(60)}
          strokeWidth={moderateScale(3)}
          delay={TIMING.loadingDelay + 200}
          duration={TIMING.loadingRotationDuration}
        />

        {/* Loading text */}
        <Animated.Text
          style={[
            styles.loadingText,
            { opacity: loadingTextOpacity },
          ]}
        >
          Preparing your health companion...
        </Animated.Text>
      </Animated.View>


      {/* ============================================================ */}
      {/* LAYER 17A: SCAN LINE */}
      {/* ============================================================ */}
      <ScanLine delay={2000} duration={4000} color={COLORS.medicalGreenGlow} lineWidth={2} />

      {/* ============================================================ */}
      {/* LAYER 17B: CORNER DECORATIONS */}
      {/* ============================================================ */}
      <CornerDecoration position='topLeft' size={moderateScale(40)} delay={2200} color={COLORS.whiteTransparent30} thickness={2} />
      <CornerDecoration position='topRight' size={moderateScale(40)} delay={2400} color={COLORS.whiteTransparent30} thickness={2} />
      <CornerDecoration position='bottomLeft' size={moderateScale(40)} delay={2600} color={COLORS.whiteTransparent30} thickness={2} />
      <CornerDecoration position='bottomRight' size={moderateScale(40)} delay={2800} color={COLORS.whiteTransparent30} thickness={2} />

      {/* ============================================================ */}
      {/* LAYER 17C: PILL CAPSULES */}
      {/* ============================================================ */}
      <PillCapsule x={SCREEN_WIDTH * 0.08} y={SCREEN_HEIGHT * 0.15} width={moderateScale(40)} height={moderateScale(18)} color1={COLORS.medicalGreenLight} color2={COLORS.primarySkyBlue} delay={3000} rotationAngle={30} />
      <PillCapsule x={SCREEN_WIDTH * 0.78} y={SCREEN_HEIGHT * 0.72} width={moderateScale(35)} height={moderateScale(16)} color1={COLORS.primaryBabyBlue} color2={COLORS.medicalGreenBright} delay={3500} rotationAngle={-45} />
      <PillCapsule x={SCREEN_WIDTH * 0.6} y={SCREEN_HEIGHT * 0.08} width={moderateScale(30)} height={moderateScale(14)} color1={COLORS.medicalGreen} color2={COLORS.primaryLightBlue} delay={4000} rotationAngle={60} />

      {/* ============================================================ */}
      {/* LAYER 17D: HEART ICON */}
      {/* ============================================================ */}
      <HeartIcon x={SCREEN_WIDTH * 0.05} y={SCREEN_HEIGHT * 0.55} size={moderateScale(25)} delay={3200} color={COLORS.medicalGreenLight} />
      <HeartIcon x={SCREEN_WIDTH * 0.85} y={SCREEN_HEIGHT * 0.2} size={moderateScale(20)} delay={3800} color={COLORS.primarySkyBlue} />

      {/* ============================================================ */}
      {/* LAYER 17E: DIAMOND PARTICLES */}
      {/* ============================================================ */}
      <DiamondParticle x={SCREEN_WIDTH * 0.1} y={SCREEN_HEIGHT * 0.7} size={moderateScale(8)} delay={2500} color={COLORS.medicalGreenGlow} duration={6000} />
      <DiamondParticle x={SCREEN_WIDTH * 0.45} y={SCREEN_HEIGHT * 0.85} size={moderateScale(6)} delay={3000} color={COLORS.blueGlow} duration={7000} />
      <DiamondParticle x={SCREEN_WIDTH * 0.8} y={SCREEN_HEIGHT * 0.5} size={moderateScale(7)} delay={3500} color={COLORS.cyanGlow} duration={5500} />
      <DiamondParticle x={SCREEN_WIDTH * 0.3} y={SCREEN_HEIGHT * 0.6} size={moderateScale(5)} delay={4000} color={COLORS.greenGlow} duration={6500} />
      <DiamondParticle x={SCREEN_WIDTH * 0.65} y={SCREEN_HEIGHT * 0.75} size={moderateScale(9)} delay={2800} color={COLORS.whiteTransparent40} duration={7500} />

      {/* ============================================================ */}
      {/* LAYER 17F: BREATHING RING */}
      {/* ============================================================ */}
      <BreathingRing size={LAYOUT.logoContainerSize * 2} delay={2000} breathDuration={5000} color={COLORS.whiteTransparent15} strokeWidth={1.5} />

      {/* ============================================================ */}
      {/* LAYER 17G: STATUS BADGES */}
      {/* ============================================================ */}
      <StatusBadge text='Secure Connection' delay={5500} x={moderateScale(20)} y={SCREEN_HEIGHT * 0.06} dotColor={COLORS.medicalGreenBright} />
      <StatusBadge text='HIPAA Compliant' delay={6000} x={SCREEN_WIDTH - moderateScale(140)} y={SCREEN_HEIGHT * 0.92} dotColor={COLORS.primarySkyBlue} />

      {/* ============================================================ */}
      {/* LAYER 17H: GRADIENT BARS */}
      {/* ============================================================ */}
      <GradientBar x={moderateScale(30)} y={SCREEN_HEIGHT * 0.46} width={moderateScale(80)} height={moderateScale(3)} delay={4500} duration={2000} startColor={COLORS.medicalGreenLight} endColor={COLORS.medicalGreenGlow} />
      <GradientBar x={SCREEN_WIDTH - moderateScale(110)} y={SCREEN_HEIGHT * 0.46} width={moderateScale(80)} height={moderateScale(3)} delay={4800} duration={2000} startColor={COLORS.primarySkyBlue} endColor={COLORS.blueGlow} />

      {/* ============================================================ */}
      {/* LAYER 17I: GRID OVERLAY */}
      {/* ============================================================ */}
      <GridOverlay cellSize={moderateScale(60)} delay={800} color={COLORS.whiteTransparent10} />

      {/* ============================================================ */}
      {/* LAYER 17J: FLOATING HEALTH TEXTS */}
      {/* ============================================================ */}
      <FloatingText text='Health' x={SCREEN_WIDTH * 0.05} y={SCREEN_HEIGHT * 0.35} delay={4000} fontSize={fontScale(10)} />
      <FloatingText text='Care' x={SCREEN_WIDTH * 0.82} y={SCREEN_HEIGHT * 0.45} delay={4500} fontSize={fontScale(9)} />
      <FloatingText text='Wellness' x={SCREEN_WIDTH * 0.12} y={SCREEN_HEIGHT * 0.68} delay={5000} fontSize={fontScale(10)} />
      <FloatingText text='Trust' x={SCREEN_WIDTH * 0.75} y={SCREEN_HEIGHT * 0.62} delay={5500} fontSize={fontScale(8)} />

      {/* ============================================================ */}
      {/* LAYER 17: VERSION */}
      {/* ============================================================ */}
      <Animated.View style={[styles.versionContainer, { opacity: versionOpacity }]}>
        <Text style={styles.versionText}>v2.0.0</Text>
        <Text style={styles.copyrightText}>
          {'\u00A9'} 2024 S-Pharma Healthcare
        </Text>
      </Animated.View>
    </Animated.View>
  );
};

// ============================================================
// ADDITIONAL PREMIUM ANIMATION COMPONENTS
// ============================================================

/**
 * RippleEffect - Creates expanding water ripple effect
 * Multiple concentric circles expand from center point
 * Used to add depth and motion to background
 * 
 * @param {number} x - Center X coordinate
 * @param {number} y - Center Y coordinate
 * @param {number} maxRadius - Maximum ripple radius
 * @param {number} delay - Animation start delay
 * @param {number} duration - Single ripple cycle duration
 * @param {string} color - Ripple line color
 * @param {number} rippleCount - Number of concurrent ripples
 */
const RippleEffect = React.memo(({ x, y, maxRadius, delay, duration, color, rippleCount }) => {
  const rippleAnims = useRef(
    Array.from({ length: rippleCount }, () => ({
      scale: new Animated.Value(0),
      opacity: new Animated.Value(0),
    }))
  ).current;

  useEffect(() => {
    const timeout = setTimeout(() => {
      rippleAnims.forEach((anim, idx) => {
        const staggerDelay = (idx / rippleCount) * duration;
        Animated.loop(
          Animated.sequence([
            Animated.delay(staggerDelay),
            Animated.parallel([
              Animated.timing(anim.scale, {
                toValue: 1,
                duration: duration,
                easing: Easing.out(Easing.cubic),
                useNativeDriver: true,
              }),
              Animated.sequence([
                Animated.timing(anim.opacity, {
                  toValue: 0.6,
                  duration: duration * 0.1,
                  easing: Easing.out(Easing.ease),
                  useNativeDriver: true,
                }),
                Animated.timing(anim.opacity, {
                  toValue: 0,
                  duration: duration * 0.9,
                  easing: Easing.in(Easing.ease),
                  useNativeDriver: true,
                }),
              ]),
            ]),
            Animated.timing(anim.scale, {
              toValue: 0,
              duration: 0,
              useNativeDriver: true,
            }),
          ])
        ).start();
      });
    }, delay);

    return () => clearTimeout(timeout);
  }, []);

  return (
    <View style={{ position: 'absolute', left: x - maxRadius, top: y - maxRadius, width: maxRadius * 2, height: maxRadius * 2 }}>
      {rippleAnims.map((anim, idx) => (
        <Animated.View
          key={`ripple-${idx}`}
          style={{
            position: 'absolute',
            width: maxRadius * 2,
            height: maxRadius * 2,
            borderRadius: maxRadius,
            borderWidth: 1.5,
            borderColor: color,
            opacity: anim.opacity,
            transform: [{ scale: anim.scale }],
          }}
        />
      ))}
    </View>
  );
});

/**
 * RotatingBadge - Slowly rotating decorative badge element
 * Creates a premium badge with rotating border segments
 * Used as decorative element around key UI areas
 * 
 * @param {number} size - Badge diameter
 * @param {number} delay - Animation start delay
 * @param {number} duration - Full rotation duration
 * @param {string} borderColor - Badge border color
 * @param {number} borderWidth - Border thickness
 * @param {number} segments - Number of visible border segments
 */
const RotatingBadge = React.memo(({ size, delay, duration, borderColor, borderWidth: bWidth, segments }) => {
  const animRotation = useRef(new Animated.Value(0)).current;
  const animOpacity = useRef(new Animated.Value(0)).current;
  const animInnerRotation = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const timeout = setTimeout(() => {
      // Fade in
      Animated.timing(animOpacity, {
        toValue: 0.5,
        duration: 1200,
        easing: Easing.ease,
        useNativeDriver: true,
      }).start();

      // Outer rotation (clockwise)
      Animated.loop(
        Animated.timing(animRotation, {
          toValue: 1,
          duration: duration,
          easing: Easing.linear,
          useNativeDriver: true,
        })
      ).start();

      // Inner rotation (counter-clockwise)
      Animated.loop(
        Animated.timing(animInnerRotation, {
          toValue: 1,
          duration: duration * 0.7,
          easing: Easing.linear,
          useNativeDriver: true,
        })
      ).start();
    }, delay);

    return () => clearTimeout(timeout);
  }, []);

  const outerRotation = animRotation.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  const innerRotation = animInnerRotation.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '-360deg'],
  });

  // Generate badge segments
  const segmentElements = [];
  const segmentArc = 360 / (segments * 2);
  for (let i = 0; i < segments; i++) {
    const angle = (i / segments) * 360;
    const radStart = (angle * Math.PI) / 180;
    const radEnd = ((angle + segmentArc) * Math.PI) / 180;
    const x1 = Math.cos(radStart) * (size / 2 - bWidth);
    const y1 = Math.sin(radStart) * (size / 2 - bWidth);
    const x2 = Math.cos(radEnd) * (size / 2 - bWidth);
    const y2 = Math.sin(radEnd) * (size / 2 - bWidth);
    const dx = x2 - x1;
    const dy = y2 - y1;
    const length = Math.sqrt(dx * dx + dy * dy);
    const rotAngle = Math.atan2(dy, dx) * (180 / Math.PI);

    segmentElements.push(
      <View
        key={`badge-seg-${i}`}
        style={{
          position: 'absolute',
          left: size / 2 + x1 - 1,
          top: size / 2 + y1 - bWidth / 2,
          width: length,
          height: bWidth,
          backgroundColor: borderColor,
          borderRadius: bWidth / 2,
          transform: [{ rotate: `${rotAngle}deg` }],
        }}
      />
    );
  }

  return (
    <Animated.View
      style={{
        position: 'absolute',
        width: size,
        height: size,
        opacity: animOpacity,
        transform: [{ rotate: outerRotation }],
      }}
    >
      {segmentElements}
      {/* Inner rotating ring */}
      <Animated.View
        style={{
          position: 'absolute',
          width: size * 0.7,
          height: size * 0.7,
          borderRadius: size * 0.35,
          borderWidth: bWidth * 0.5,
          borderColor: borderColor,
          borderStyle: 'dashed',
          top: size * 0.15,
          left: size * 0.15,
          opacity: 0.3,
          transform: [{ rotate: innerRotation }],
        }}
      />
    </Animated.View>
  );
});

/**
 * PillCapsule - Animated pharmaceutical pill/capsule shape
 * Creates a floating pill that rotates and bobs gently
 * Healthcare-themed decorative element
 * 
 * @param {number} x - Horizontal position
 * @param {number} y - Vertical position
 * @param {number} width - Pill width
 * @param {number} height - Pill height
 * @param {string} color1 - First half color
 * @param {string} color2 - Second half color
 * @param {number} delay - Animation start delay
 * @param {number} rotationAngle - Initial rotation angle
 */
const PillCapsule = React.memo(({ x, y, width: pillWidth, height: pillHeight, color1, color2, delay, rotationAngle }) => {
  const animOpacity = useRef(new Animated.Value(0)).current;
  const animRotation = useRef(new Animated.Value(0)).current;
  const animTranslateY = useRef(new Animated.Value(0)).current;
  const animScale = useRef(new Animated.Value(0.6)).current;

  useEffect(() => {
    const timeout = setTimeout(() => {
      // Fade and scale in
      Animated.parallel([
        Animated.timing(animOpacity, {
          toValue: 0.4,
          duration: 1000,
          easing: Easing.ease,
          useNativeDriver: true,
        }),
        Animated.spring(animScale, {
          toValue: 1,
          friction: 5,
          tension: 40,
          useNativeDriver: true,
        }),
      ]).start();

      // Gentle rotation
      Animated.loop(
        Animated.sequence([
          Animated.timing(animRotation, {
            toValue: 1,
            duration: 8000,
            easing: Easing.inOut(Easing.sin),
            useNativeDriver: true,
          }),
          Animated.timing(animRotation, {
            toValue: 0,
            duration: 8000,
            easing: Easing.inOut(Easing.sin),
            useNativeDriver: true,
          }),
        ])
      ).start();

      // Bobbing motion
      Animated.loop(
        Animated.sequence([
          Animated.timing(animTranslateY, {
            toValue: -15,
            duration: 3000,
            easing: Easing.inOut(Easing.sin),
            useNativeDriver: true,
          }),
          Animated.timing(animTranslateY, {
            toValue: 15,
            duration: 3000,
            easing: Easing.inOut(Easing.sin),
            useNativeDriver: true,
          }),
        ])
      ).start();
    }, delay);

    return () => clearTimeout(timeout);
  }, []);

  const rotation = animRotation.interpolate({
    inputRange: [0, 1],
    outputRange: [`${rotationAngle - 20}deg`, `${rotationAngle + 20}deg`],
  });

  const borderRadius = pillHeight / 2;

  return (
    <Animated.View
      style={{
        position: 'absolute',
        left: x,
        top: y,
        width: pillWidth,
        height: pillHeight,
        opacity: animOpacity,
        transform: [
          { rotate: rotation },
          { translateY: animTranslateY },
          { scale: animScale },
        ],
        flexDirection: 'row',
        borderRadius: borderRadius,
        overflow: 'hidden',
        shadowColor: color1,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 6,
        elevation: 4,
      }}
    >
      {/* Left half */}
      <View
        style={{
          flex: 1,
          backgroundColor: color1,
          borderTopLeftRadius: borderRadius,
          borderBottomLeftRadius: borderRadius,
        }}
      >
        {/* Highlight */}
        <View
          style={{
            position: 'absolute',
            top: pillHeight * 0.15,
            left: pillWidth * 0.08,
            width: pillWidth * 0.15,
            height: pillHeight * 0.3,
            backgroundColor: COLORS.whiteTransparent30,
            borderRadius: pillWidth * 0.04,
          }}
        />
      </View>
      {/* Right half */}
      <View
        style={{
          flex: 1,
          backgroundColor: color2,
          borderTopRightRadius: borderRadius,
          borderBottomRightRadius: borderRadius,
        }}
      />
      {/* Center line */}
      <View
        style={{
          position: 'absolute',
          left: pillWidth / 2 - 0.5,
          top: 0,
          width: 1,
          height: pillHeight,
          backgroundColor: COLORS.whiteTransparent20,
        }}
      />
    </Animated.View>
  );
});

/**
 * StethoscopeIcon - Simplified animated stethoscope
 * Healthcare-themed decorative icon
 * Pulses gently to suggest listening/monitoring
 * 
 * @param {number} x - Position X
 * @param {number} y - Position Y
 * @param {number} size - Icon size
 * @param {number} delay - Animation delay
 */
const StethoscopeIcon = React.memo(({ x, y, size, delay }) => {
  const animOpacity = useRef(new Animated.Value(0)).current;
  const animScale = useRef(new Animated.Value(0.5)).current;
  const animPulse = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    const timeout = setTimeout(() => {
      Animated.parallel([
        Animated.timing(animOpacity, {
          toValue: 0.35,
          duration: 1200,
          easing: Easing.ease,
          useNativeDriver: true,
        }),
        Animated.spring(animScale, {
          toValue: 1,
          friction: 4,
          tension: 50,
          useNativeDriver: true,
        }),
      ]).start();

      // Pulse animation
      Animated.loop(
        Animated.sequence([
          Animated.timing(animPulse, {
            toValue: 1.15,
            duration: 1500,
            easing: Easing.inOut(Easing.ease),
            useNativeDriver: true,
          }),
          Animated.timing(animPulse, {
            toValue: 1,
            duration: 1500,
            easing: Easing.inOut(Easing.ease),
            useNativeDriver: true,
          }),
        ])
      ).start();
    }, delay);

    return () => clearTimeout(timeout);
  }, []);

  const tubeWidth = size * 0.08;
  const headSize = size * 0.3;

  return (
    <Animated.View
      style={{
        position: 'absolute',
        left: x,
        top: y,
        width: size,
        height: size,
        opacity: animOpacity,
        transform: [{ scale: animScale }],
      }}
    >
      {/* Y-shaped tube top */}
      <View
        style={{
          position: 'absolute',
          top: 0,
          left: size * 0.25,
          width: tubeWidth,
          height: size * 0.35,
          backgroundColor: COLORS.whiteTransparent50,
          borderRadius: tubeWidth / 2,
          transform: [{ rotate: '-15deg' }],
        }}
      />
      <View
        style={{
          position: 'absolute',
          top: 0,
          right: size * 0.25,
          width: tubeWidth,
          height: size * 0.35,
          backgroundColor: COLORS.whiteTransparent50,
          borderRadius: tubeWidth / 2,
          transform: [{ rotate: '15deg' }],
        }}
      />
      {/* Ear tips */}
      <View
        style={{
          position: 'absolute',
          top: -tubeWidth,
          left: size * 0.2,
          width: tubeWidth * 2,
          height: tubeWidth * 2,
          borderRadius: tubeWidth,
          backgroundColor: COLORS.whiteTransparent60,
        }}
      />
      <View
        style={{
          position: 'absolute',
          top: -tubeWidth,
          right: size * 0.2,
          width: tubeWidth * 2,
          height: tubeWidth * 2,
          borderRadius: tubeWidth,
          backgroundColor: COLORS.whiteTransparent60,
        }}
      />
      {/* Main tube */}
      <View
        style={{
          position: 'absolute',
          top: size * 0.3,
          left: size / 2 - tubeWidth / 2,
          width: tubeWidth,
          height: size * 0.4,
          backgroundColor: COLORS.whiteTransparent50,
          borderRadius: tubeWidth / 2,
        }}
      />
      {/* Chest piece (pulsing) */}
      <Animated.View
        style={{
          position: 'absolute',
          bottom: 0,
          left: size / 2 - headSize / 2,
          width: headSize,
          height: headSize,
          borderRadius: headSize / 2,
          backgroundColor: COLORS.medicalGreenLight,
          opacity: 0.7,
          transform: [{ scale: animPulse }],
          shadowColor: COLORS.medicalGreen,
          shadowOffset: { width: 0, height: 0 },
          shadowOpacity: 0.5,
          shadowRadius: 8,
        }}
      >
        {/* Inner circle */}
        <View
          style={{
            position: 'absolute',
            top: headSize * 0.2,
            left: headSize * 0.2,
            width: headSize * 0.6,
            height: headSize * 0.6,
            borderRadius: headSize * 0.3,
            borderWidth: 1.5,
            borderColor: COLORS.whiteTransparent40,
            backgroundColor: 'transparent',
          }}
        />
      </Animated.View>
    </Animated.View>
  );
});

/**
 * HeartIcon - Animated heart shape
 * Beats with a realistic heartbeat rhythm
 * Uses two overlapping circles and a rotated square
 * 
 * @param {number} x - Position X
 * @param {number} y - Position Y
 * @param {number} size - Heart size
 * @param {number} delay - Animation delay
 * @param {string} color - Heart color
 */
const HeartIcon = React.memo(({ x, y, size, delay, color }) => {
  const animOpacity = useRef(new Animated.Value(0)).current;
  const animScale = useRef(new Animated.Value(0.5)).current;
  const animBeat = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    const timeout = setTimeout(() => {
      Animated.parallel([
        Animated.timing(animOpacity, {
          toValue: 0.4,
          duration: 800,
          useNativeDriver: true,
        }),
        Animated.spring(animScale, {
          toValue: 1,
          friction: 4,
          tension: 50,
          useNativeDriver: true,
        }),
      ]).start();

      // Heartbeat rhythm: quick double-beat then pause
      Animated.loop(
        Animated.sequence([
          // First beat
          Animated.timing(animBeat, {
            toValue: 1.25,
            duration: 150,
            easing: Easing.out(Easing.ease),
            useNativeDriver: true,
          }),
          Animated.timing(animBeat, {
            toValue: 1,
            duration: 150,
            easing: Easing.in(Easing.ease),
            useNativeDriver: true,
          }),
          // Second beat (slightly smaller)
          Animated.timing(animBeat, {
            toValue: 1.15,
            duration: 130,
            easing: Easing.out(Easing.ease),
            useNativeDriver: true,
          }),
          Animated.timing(animBeat, {
            toValue: 1,
            duration: 130,
            easing: Easing.in(Easing.ease),
            useNativeDriver: true,
          }),
          // Pause between beats
          Animated.delay(800),
        ])
      ).start();
    }, delay);

    return () => clearTimeout(timeout);
  }, []);

  const halfSize = size / 2;
  const circleRadius = halfSize * 0.55;

  return (
    <Animated.View
      style={{
        position: 'absolute',
        left: x,
        top: y,
        width: size,
        height: size,
        opacity: animOpacity,
        transform: [
          { scale: Animated.multiply(animScale, animBeat) },
        ],
      }}
    >
      {/* Left circle */}
      <View
        style={{
          position: 'absolute',
          left: halfSize * 0.15,
          top: halfSize * 0.15,
          width: circleRadius * 2,
          height: circleRadius * 2,
          borderRadius: circleRadius,
          backgroundColor: color,
        }}
      />
      {/* Right circle */}
      <View
        style={{
          position: 'absolute',
          right: halfSize * 0.15,
          top: halfSize * 0.15,
          width: circleRadius * 2,
          height: circleRadius * 2,
          borderRadius: circleRadius,
          backgroundColor: color,
        }}
      />
      {/* Bottom triangle (rotated square) */}
      <View
        style={{
          position: 'absolute',
          left: halfSize - halfSize * 0.52,
          top: halfSize * 0.55,
          width: halfSize * 1.04,
          height: halfSize * 1.04,
          backgroundColor: color,
          transform: [{ rotate: '45deg' }],
          borderRadius: halfSize * 0.05,
        }}
      />
      {/* Highlight */}
      <View
        style={{
          position: 'absolute',
          left: halfSize * 0.35,
          top: halfSize * 0.25,
          width: circleRadius * 0.5,
          height: circleRadius * 0.8,
          borderRadius: circleRadius * 0.25,
          backgroundColor: COLORS.whiteTransparent30,
          transform: [{ rotate: '-20deg' }],
        }}
      />
    </Animated.View>
  );
});

/**
 * CrosshairTarget - Animated targeting crosshair
 * Tech-inspired element suggesting precision and accuracy
 * Features rotating outer ring and pulsing center dot
 * 
 * @param {number} x - Center X position
 * @param {number} y - Center Y position
 * @param {number} size - Crosshair diameter
 * @param {number} delay - Animation start delay
 */
const CrosshairTarget = React.memo(({ x, y, size, delay }) => {
  const animOpacity = useRef(new Animated.Value(0)).current;
  const animRotation = useRef(new Animated.Value(0)).current;
  const animCenterPulse = useRef(new Animated.Value(1)).current;
  const animCenterOpacity = useRef(new Animated.Value(0.3)).current;

  useEffect(() => {
    const timeout = setTimeout(() => {
      Animated.timing(animOpacity, {
        toValue: 0.3,
        duration: 1500,
        easing: Easing.ease,
        useNativeDriver: true,
      }).start();

      // Slow rotation
      Animated.loop(
        Animated.timing(animRotation, {
          toValue: 1,
          duration: 12000,
          easing: Easing.linear,
          useNativeDriver: true,
        })
      ).start();

      // Center dot pulse
      Animated.loop(
        Animated.sequence([
          Animated.parallel([
            Animated.timing(animCenterPulse, {
              toValue: 1.5,
              duration: 1000,
              easing: Easing.inOut(Easing.ease),
              useNativeDriver: true,
            }),
            Animated.timing(animCenterOpacity, {
              toValue: 0.8,
              duration: 1000,
              easing: Easing.inOut(Easing.ease),
              useNativeDriver: true,
            }),
          ]),
          Animated.parallel([
            Animated.timing(animCenterPulse, {
              toValue: 1,
              duration: 1000,
              easing: Easing.inOut(Easing.ease),
              useNativeDriver: true,
            }),
            Animated.timing(animCenterOpacity, {
              toValue: 0.3,
              duration: 1000,
              easing: Easing.inOut(Easing.ease),
              useNativeDriver: true,
            }),
          ]),
        ])
      ).start();
    }, delay);

    return () => clearTimeout(timeout);
  }, []);

  const rotation = animRotation.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  const lineLength = size * 0.2;
  const lineThickness = 1.5;
  const gapFromCenter = size * 0.15;

  return (
    <Animated.View
      style={{
        position: 'absolute',
        left: x - size / 2,
        top: y - size / 2,
        width: size,
        height: size,
        opacity: animOpacity,
        transform: [{ rotate: rotation }],
      }}
    >
      {/* Outer circle */}
      <View
        style={{
          position: 'absolute',
          width: size,
          height: size,
          borderRadius: size / 2,
          borderWidth: 1,
          borderColor: COLORS.whiteTransparent30,
          backgroundColor: 'transparent',
        }}
      />
      {/* Inner circle */}
      <View
        style={{
          position: 'absolute',
          width: size * 0.6,
          height: size * 0.6,
          borderRadius: size * 0.3,
          borderWidth: 0.75,
          borderColor: COLORS.whiteTransparent20,
          backgroundColor: 'transparent',
          top: size * 0.2,
          left: size * 0.2,
        }}
      />
      {/* Top line */}
      <View
        style={{
          position: 'absolute',
          top: size / 2 - gapFromCenter - lineLength,
          left: size / 2 - lineThickness / 2,
          width: lineThickness,
          height: lineLength,
          backgroundColor: COLORS.whiteTransparent50,
        }}
      />
      {/* Bottom line */}
      <View
        style={{
          position: 'absolute',
          top: size / 2 + gapFromCenter,
          left: size / 2 - lineThickness / 2,
          width: lineThickness,
          height: lineLength,
          backgroundColor: COLORS.whiteTransparent50,
        }}
      />
      {/* Left line */}
      <View
        style={{
          position: 'absolute',
          top: size / 2 - lineThickness / 2,
          left: size / 2 - gapFromCenter - lineLength,
          width: lineLength,
          height: lineThickness,
          backgroundColor: COLORS.whiteTransparent50,
        }}
      />
      {/* Right line */}
      <View
        style={{
          position: 'absolute',
          top: size / 2 - lineThickness / 2,
          left: size / 2 + gapFromCenter,
          width: lineLength,
          height: lineThickness,
          backgroundColor: COLORS.whiteTransparent50,
        }}
      />
      {/* Center dot (pulsing) */}
      <Animated.View
        style={{
          position: 'absolute',
          width: size * 0.06,
          height: size * 0.06,
          borderRadius: size * 0.03,
          backgroundColor: COLORS.medicalGreenLight,
          top: size / 2 - size * 0.03,
          left: size / 2 - size * 0.03,
          opacity: animCenterOpacity,
          transform: [{ scale: animCenterPulse }],
        }}
      />
    </Animated.View>
  );
});

/**
 * DataFlowLine - Animated line showing data flow
 * A line with a moving dot/pulse that travels along it
 * Represents digital connectivity and data transfer
 * 
 * @param {number} startX - Line start X
 * @param {number} startY - Line start Y
 * @param {number} endX - Line end X
 * @param {number} endY - Line end Y
 * @param {number} delay - Animation delay
 * @param {number} duration - Pulse travel duration
 * @param {string} lineColor - Line color
 * @param {string} pulseColor - Traveling pulse color
 */
const DataFlowLine = React.memo(({ startX, startY, endX, endY, delay, duration, lineColor, pulseColor }) => {
  const animOpacity = useRef(new Animated.Value(0)).current;
  const animPulseProgress = useRef(new Animated.Value(0)).current;
  const animPulseOpacity = useRef(new Animated.Value(0)).current;

  const dx = endX - startX;
  const dy = endY - startY;
  const length = Math.sqrt(dx * dx + dy * dy);
  const angle = Math.atan2(dy, dx) * (180 / Math.PI);

  useEffect(() => {
    const timeout = setTimeout(() => {
      Animated.timing(animOpacity, {
        toValue: 0.3,
        duration: 1000,
        useNativeDriver: true,
      }).start();

      // Pulse traveling along line
      Animated.loop(
        Animated.sequence([
          Animated.timing(animPulseOpacity, {
            toValue: 1,
            duration: 200,
            useNativeDriver: true,
          }),
          Animated.timing(animPulseProgress, {
            toValue: 1,
            duration: duration,
            easing: Easing.inOut(Easing.ease),
            useNativeDriver: true,
          }),
          Animated.timing(animPulseOpacity, {
            toValue: 0,
            duration: 200,
            useNativeDriver: true,
          }),
          Animated.timing(animPulseProgress, {
            toValue: 0,
            duration: 0,
            useNativeDriver: true,
          }),
          Animated.delay(500 + Math.random() * 1000),
        ])
      ).start();
    }, delay);

    return () => clearTimeout(timeout);
  }, []);

  const pulseTranslateX = animPulseProgress.interpolate({
    inputRange: [0, 1],
    outputRange: [0, length - 8],
  });

  const dotSize = 6;

  return (
    <Animated.View
      style={{
        position: 'absolute',
        left: startX,
        top: startY,
        width: length,
        height: 10,
        opacity: animOpacity,
        transform: [{ rotate: `${angle}deg` }],
      }}
    >
      {/* Line */}
      <View
        style={{
          position: 'absolute',
          top: 4.5,
          left: 0,
          width: length,
          height: 1,
          backgroundColor: lineColor,
        }}
      />
      {/* Traveling pulse dot */}
      <Animated.View
        style={{
          position: 'absolute',
          top: 5 - dotSize / 2,
          left: 0,
          width: dotSize,
          height: dotSize,
          borderRadius: dotSize / 2,
          backgroundColor: pulseColor,
          opacity: animPulseOpacity,
          transform: [{ translateX: pulseTranslateX }],
          shadowColor: pulseColor,
          shadowOffset: { width: 0, height: 0 },
          shadowOpacity: 0.8,
          shadowRadius: 4,
        }}
      />
    </Animated.View>
  );
});

/**
 * CornerDecoration - Animated L-shaped corner decorations
 * Tech/modern UI corner brackets that appear in screen corners
 * Adds a sleek, premium frame to the splash screen
 * 
 * @param {string} position - Corner: 'topLeft', 'topRight', 'bottomLeft', 'bottomRight'
 * @param {number} size - Decoration size
 * @param {number} delay - Animation delay
 * @param {string} color - Line color
 * @param {number} thickness - Line thickness
 */
const CornerDecoration = React.memo(({ position, size, delay, color, thickness }) => {
  const animOpacity = useRef(new Animated.Value(0)).current;
  const animScale = useRef(new Animated.Value(0.5)).current;

  useEffect(() => {
    const timeout = setTimeout(() => {
      Animated.parallel([
        Animated.timing(animOpacity, {
          toValue: 0.4,
          duration: 1200,
          easing: Easing.ease,
          useNativeDriver: true,
        }),
        Animated.spring(animScale, {
          toValue: 1,
          friction: 5,
          tension: 40,
          useNativeDriver: true,
        }),
      ]).start();
    }, delay);

    return () => clearTimeout(timeout);
  }, []);

  const positionStyle = {};
  const margin = moderateScale(20);

  if (position === 'topLeft') {
    positionStyle.top = margin;
    positionStyle.left = margin;
  } else if (position === 'topRight') {
    positionStyle.top = margin;
    positionStyle.right = margin;
  } else if (position === 'bottomLeft') {
    positionStyle.bottom = margin;
    positionStyle.left = margin;
  } else {
    positionStyle.bottom = margin;
    positionStyle.right = margin;
  }

  const isTop = position.includes('top');
  const isLeft = position.includes('Left');

  return (
    <Animated.View
      style={{
        position: 'absolute',
        ...positionStyle,
        width: size,
        height: size,
        opacity: animOpacity,
        transform: [{ scale: animScale }],
        zIndex: 20,
      }}
    >
      {/* Horizontal line */}
      <View
        style={{
          position: 'absolute',
          [isTop ? 'top' : 'bottom']: 0,
          [isLeft ? 'left' : 'right']: 0,
          width: size * 0.6,
          height: thickness,
          backgroundColor: color,
          borderRadius: thickness / 2,
        }}
      />
      {/* Vertical line */}
      <View
        style={{
          position: 'absolute',
          [isTop ? 'top' : 'bottom']: 0,
          [isLeft ? 'left' : 'right']: 0,
          width: thickness,
          height: size * 0.6,
          backgroundColor: color,
          borderRadius: thickness / 2,
        }}
      />
      {/* Corner dot */}
      <View
        style={{
          position: 'absolute',
          [isTop ? 'top' : 'bottom']: -thickness,
          [isLeft ? 'left' : 'right']: -thickness,
          width: thickness * 3,
          height: thickness * 3,
          borderRadius: thickness * 1.5,
          backgroundColor: color,
        }}
      />
    </Animated.View>
  );
});

/**
 * TextShimmer - Animated text with sweeping shimmer effect
 * A line of text where a bright highlight sweeps across
 * Premium text animation for key labels
 * 
 * @param {string} text - Text to display
 * @param {number} fontSize - Font size
 * @param {number} delay - Animation delay
 * @param {number} y - Vertical position
 */
const TextShimmer = React.memo(({ text, fontSize: fSize, delay, y }) => {
  const animOpacity = useRef(new Animated.Value(0)).current;
  const animShimmerX = useRef(new Animated.Value(-1)).current;

  useEffect(() => {
    const timeout = setTimeout(() => {
      Animated.timing(animOpacity, {
        toValue: 0.6,
        duration: 800,
        useNativeDriver: true,
      }).start();

      Animated.loop(
        Animated.sequence([
          Animated.timing(animShimmerX, {
            toValue: 2,
            duration: 2500,
            easing: Easing.inOut(Easing.ease),
            useNativeDriver: true,
          }),
          Animated.delay(3000),
          Animated.timing(animShimmerX, {
            toValue: -1,
            duration: 0,
            useNativeDriver: true,
          }),
        ])
      ).start();
    }, delay);

    return () => clearTimeout(timeout);
  }, []);

  return (
    <Animated.View
      style={{
        position: 'absolute',
        top: y,
        alignSelf: 'center',
        opacity: animOpacity,
        zIndex: 16,
      }}
    >
      <Text
        style={{
          fontSize: fSize,
          fontFamily: FONTS.tagline,
          color: COLORS.whiteTransparent50,
          letterSpacing: moderateScale(4),
          textTransform: 'uppercase',
        }}
      >
        {text}
      </Text>
    </Animated.View>
  );
});

/**
 * CircuitLine - Animated circuit board trace line
 * Creates technical-looking circuit patterns
 * Features 90-degree turns like PCB traces
 * 
 * @param {Array} points - Array of {x, y} waypoints
 * @param {number} delay - Animation delay
 * @param {string} color - Line color
 * @param {number} thickness - Line thickness
 */
const CircuitLine = React.memo(({ points, delay, color, thickness }) => {
  const animOpacity = useRef(new Animated.Value(0)).current;
  const animProgress = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const timeout = setTimeout(() => {
      Animated.timing(animOpacity, {
        toValue: 0.25,
        duration: 1500,
        useNativeDriver: true,
      }).start();

      Animated.loop(
        Animated.sequence([
          Animated.timing(animProgress, {
            toValue: 1,
            duration: 3000,
            easing: Easing.linear,
            useNativeDriver: true,
          }),
          Animated.timing(animProgress, {
            toValue: 0,
            duration: 0,
            useNativeDriver: true,
          }),
          Animated.delay(1000),
        ])
      ).start();
    }, delay);

    return () => clearTimeout(timeout);
  }, []);

  return (
    <Animated.View style={{ position: 'absolute', width: SCREEN_WIDTH, height: SCREEN_HEIGHT, opacity: animOpacity }}>
      {points.map((point, idx) => {
        if (idx === 0) return null;
        const prev = points[idx - 1];
        const isHorizontal = prev.y === point.y;
        const segLength = isHorizontal ? Math.abs(point.x - prev.x) : Math.abs(point.y - prev.y);

        return (
          <View
            key={`circuit-${idx}`}
            style={{
              position: 'absolute',
              left: Math.min(prev.x, point.x),
              top: Math.min(prev.y, point.y),
              width: isHorizontal ? segLength : thickness,
              height: isHorizontal ? thickness : segLength,
              backgroundColor: color,
              borderRadius: thickness / 2,
            }}
          />
        );
      })}
      {/* Junction dots at corners */}
      {points.map((point, idx) => (
        <View
          key={`junction-${idx}`}
          style={{
            position: 'absolute',
            left: point.x - thickness,
            top: point.y - thickness,
            width: thickness * 2,
            height: thickness * 2,
            borderRadius: thickness,
            backgroundColor: color,
          }}
        />
      ))}
    </Animated.View>
  );
});

/**
 * GridOverlay - Subtle animated grid lines overlay
 * Creates a tech/futuristic grid background effect
 * Lines pulse and fade for a living feel
 * 
 * @param {number} cellSize - Grid cell size
 * @param {number} delay - Animation delay
 * @param {string} color - Grid line color
 */
const GridOverlay = React.memo(({ cellSize, delay, color }) => {
  const animOpacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const timeout = setTimeout(() => {
      Animated.loop(
        Animated.sequence([
          Animated.timing(animOpacity, {
            toValue: 0.08,
            duration: 3000,
            easing: Easing.inOut(Easing.ease),
            useNativeDriver: true,
          }),
          Animated.timing(animOpacity, {
            toValue: 0.02,
            duration: 3000,
            easing: Easing.inOut(Easing.ease),
            useNativeDriver: true,
          }),
        ])
      ).start();
    }, delay);

    return () => clearTimeout(timeout);
  }, []);

  const horizontalLines = [];
  const verticalLines = [];
  const hCount = Math.ceil(SCREEN_HEIGHT / cellSize);
  const vCount = Math.ceil(SCREEN_WIDTH / cellSize);

  for (let i = 0; i <= hCount; i++) {
    horizontalLines.push(
      <View
        key={`h-grid-${i}`}
        style={{
          position: 'absolute',
          left: 0,
          right: 0,
          top: i * cellSize,
          height: 0.5,
          backgroundColor: color,
        }}
      />
    );
  }

  for (let i = 0; i <= vCount; i++) {
    verticalLines.push(
      <View
        key={`v-grid-${i}`}
        style={{
          position: 'absolute',
          top: 0,
          bottom: 0,
          left: i * cellSize,
          width: 0.5,
          backgroundColor: color,
        }}
      />
    );
  }

  return (
    <Animated.View
      style={{
        ...StyleSheet.absoluteFillObject,
        opacity: animOpacity,
        zIndex: 1,
      }}
    >
      {horizontalLines}
      {verticalLines}
    </Animated.View>
  );
});

/**
 * RadarSweep - Rotating radar/scanner sweep effect
 * Creates a pie-slice shaped sweep that rotates around a center
 * Adds a high-tech surveillance/monitoring feel
 * 
 * @param {number} x - Center X
 * @param {number} y - Center Y
 * @param {number} radius - Sweep radius
 * @param {number} delay - Animation delay
 * @param {number} duration - Full rotation duration
 * @param {string} color - Sweep gradient color
 */
const RadarSweep = React.memo(({ x, y, radius, delay, duration, color }) => {
  const animRotation = useRef(new Animated.Value(0)).current;
  const animOpacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const timeout = setTimeout(() => {
      Animated.timing(animOpacity, {
        toValue: 0.2,
        duration: 1500,
        useNativeDriver: true,
      }).start();

      Animated.loop(
        Animated.timing(animRotation, {
          toValue: 1,
          duration: duration,
          easing: Easing.linear,
          useNativeDriver: true,
        })
      ).start();
    }, delay);

    return () => clearTimeout(timeout);
  }, []);

  const rotation = animRotation.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  return (
    <Animated.View
      style={{
        position: 'absolute',
        left: x - radius,
        top: y - radius,
        width: radius * 2,
        height: radius * 2,
        opacity: animOpacity,
        transform: [{ rotate: rotation }],
      }}
    >
      {/* Sweep line */}
      <View
        style={{
          position: 'absolute',
          top: 0,
          left: radius - 0.5,
          width: 1,
          height: radius,
          backgroundColor: color,
        }}
      />
      {/* Sweep trail (approximated with multiple lines) */}
      {[...Array(8)].map((_, i) => {
        const trailAngle = -(i + 1) * 3;
        const trailOpacity = 1 - (i / 8);
        return (
          <View
            key={`trail-${i}`}
            style={{
              position: 'absolute',
              top: 0,
              left: radius - 0.5,
              width: 1,
              height: radius,
              backgroundColor: color,
              opacity: trailOpacity * 0.5,
              transform: [
                { rotate: `${trailAngle}deg` },
              ],
              transformOrigin: `0.5px ${radius}px`,
            }}
          />
        );
      })}
      {/* Center circle */}
      <View
        style={{
          position: 'absolute',
          top: radius - 3,
          left: radius - 3,
          width: 6,
          height: 6,
          borderRadius: 3,
          backgroundColor: color,
        }}
      />
      {/* Range rings */}
      {[0.33, 0.66, 1].map((ringScale, i) => (
        <View
          key={`range-${i}`}
          style={{
            position: 'absolute',
            top: radius - radius * ringScale,
            left: radius - radius * ringScale,
            width: radius * 2 * ringScale,
            height: radius * 2 * ringScale,
            borderRadius: radius * ringScale,
            borderWidth: 0.5,
            borderColor: color,
            backgroundColor: 'transparent',
            opacity: 0.3,
          }}
        />
      ))}
    </Animated.View>
  );
});

/**
 * HealthBars - Animated health statistics bar graph
 * Displays animated bar chart representing health metrics
 * Bars fill up one by one with different heights
 * 
 * @param {number} x - Position X
 * @param {number} y - Position Y
 * @param {number} width - Container width
 * @param {number} height - Container height
 * @param {number} delay - Animation delay
 * @param {number} barCount - Number of bars
 */
const HealthBars = React.memo(({ x, y, width: containerWidth, height: containerHeight, delay, barCount }) => {
  const barAnims = useRef(
    Array.from({ length: barCount }, () => ({
      height: new Animated.Value(0),
      opacity: new Animated.Value(0),
    }))
  ).current;

  const containerOpacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const timeout = setTimeout(() => {
      Animated.timing(containerOpacity, {
        toValue: 0.3,
        duration: 800,
        useNativeDriver: true,
      }).start();

      const barHeights = [0.6, 0.8, 0.45, 0.95, 0.7, 0.55, 0.85, 0.5];
      barAnims.forEach((anim, idx) => {
        const targetHeight = barHeights[idx % barHeights.length];
        Animated.sequence([
          Animated.delay(idx * 150),
          Animated.parallel([
            Animated.timing(anim.opacity, {
              toValue: 1,
              duration: 400,
              useNativeDriver: false,
            }),
            Animated.timing(anim.height, {
              toValue: targetHeight,
              duration: 800,
              easing: Easing.out(Easing.back(1.1)),
              useNativeDriver: false,
            }),
          ]),
        ]).start();
      });
    }, delay);

    return () => clearTimeout(timeout);
  }, []);

  const barWidth = (containerWidth - (barCount - 1) * 3) / barCount;
  const barColors = [
    COLORS.medicalGreenLight,
    COLORS.primarySkyBlue,
    COLORS.medicalGreenBright,
    COLORS.primaryBabyBlue,
    COLORS.medicalGreen,
    COLORS.primaryLightBlue,
    COLORS.medicalGreenPale,
    COLORS.primarySkyBlue,
  ];

  return (
    <Animated.View
      style={{
        position: 'absolute',
        left: x,
        top: y,
        width: containerWidth,
        height: containerHeight,
        opacity: containerOpacity,
        flexDirection: 'row',
        alignItems: 'flex-end',
      }}
    >
      {barAnims.map((anim, idx) => {
        const barH = anim.height.interpolate({
          inputRange: [0, 1],
          outputRange: [0, containerHeight],
        });
        return (
          <Animated.View
            key={`bar-${idx}`}
            style={{
              width: barWidth,
              height: barH,
              backgroundColor: barColors[idx % barColors.length],
              borderTopLeftRadius: 2,
              borderTopRightRadius: 2,
              marginLeft: idx > 0 ? 3 : 0,
              opacity: anim.opacity,
            }}
          />
        );
      })}
    </Animated.View>
  );
});

/**
 * PulsingIcon - Animated circle icon with inner symbol
 * Generic pulsing icon used for health-related symbols
 * Can display a plus, heart, or shield shape inside
 * 
 * @param {number} x - Position X
 * @param {number} y - Position Y
 * @param {number} size - Icon container size
 * @param {number} delay - Animation delay
 * @param {string} color - Icon color
 * @param {string} iconType - 'plus', 'circle', or 'diamond'
 */
const PulsingIcon = React.memo(({ x, y, size, delay, color, iconType }) => {
  const animOpacity = useRef(new Animated.Value(0)).current;
  const animScale = useRef(new Animated.Value(0.3)).current;
  const animPulse = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    const timeout = setTimeout(() => {
      Animated.parallel([
        Animated.timing(animOpacity, {
          toValue: 0.35,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.spring(animScale, {
          toValue: 1,
          friction: 4,
          tension: 50,
          useNativeDriver: true,
        }),
      ]).start();

      Animated.loop(
        Animated.sequence([
          Animated.timing(animPulse, {
            toValue: 1.2,
            duration: 2000,
            easing: Easing.inOut(Easing.ease),
            useNativeDriver: true,
          }),
          Animated.timing(animPulse, {
            toValue: 1,
            duration: 2000,
            easing: Easing.inOut(Easing.ease),
            useNativeDriver: true,
          }),
        ])
      ).start();
    }, delay);

    return () => clearTimeout(timeout);
  }, []);

  const renderInnerIcon = () => {
    const innerSize = size * 0.4;
    if (iconType === 'plus') {
      return (
        <>
          <View style={{ position: 'absolute', width: innerSize, height: innerSize * 0.25, backgroundColor: COLORS.accentWhite, borderRadius: 2, top: size / 2 - innerSize * 0.125, left: size / 2 - innerSize / 2 }} />
          <View style={{ position: 'absolute', width: innerSize * 0.25, height: innerSize, backgroundColor: COLORS.accentWhite, borderRadius: 2, top: size / 2 - innerSize / 2, left: size / 2 - innerSize * 0.125 }} />
        </>
      );
    } else if (iconType === 'diamond') {
      return (
        <View style={{ position: 'absolute', width: innerSize * 0.7, height: innerSize * 0.7, backgroundColor: COLORS.accentWhite, borderRadius: 3, top: size / 2 - innerSize * 0.35, left: size / 2 - innerSize * 0.35, transform: [{ rotate: '45deg' }], opacity: 0.8 }} />
      );
    } else {
      return (
        <View style={{ position: 'absolute', width: innerSize * 0.5, height: innerSize * 0.5, borderRadius: innerSize * 0.25, backgroundColor: COLORS.accentWhite, top: size / 2 - innerSize * 0.25, left: size / 2 - innerSize * 0.25, opacity: 0.8 }} />
      );
    }
  };

  return (
    <Animated.View
      style={{
        position: 'absolute',
        left: x,
        top: y,
        width: size,
        height: size,
        borderRadius: size / 2,
        backgroundColor: color,
        opacity: animOpacity,
        transform: [
          { scale: Animated.multiply(animScale, animPulse) },
        ],
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {/* Outer glow */}
      <View
        style={{
          position: 'absolute',
          width: size * 1.6,
          height: size * 1.6,
          borderRadius: size * 0.8,
          backgroundColor: color,
          top: -size * 0.3,
          left: -size * 0.3,
          opacity: 0.15,
        }}
      />
      {renderInnerIcon()}
    </Animated.View>
  );
});

// ============================================================
// STYLESHEET DEFINITIONS
// ============================================================

/**
 * Comprehensive StyleSheet for all splash screen elements
 * Organized by component/layer for maintainability
 * Uses responsive scaling functions throughout
 */
const styles = StyleSheet.create({
  // ---- Container & Background ----
  container: {
    flex: 1,
    backgroundColor: COLORS.primaryDeepBlue,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },

  backgroundLayer: {
    ...StyleSheet.absoluteFillObject,
    zIndex: 0,
  },

  gradient: {
    flex: 1,
    width: '100%',
    height: '100%',
  },

  // ---- Ambient Layer ----
  ambientLayer: {
    ...StyleSheet.absoluteFillObject,
    zIndex: 1,
  },

  // ---- Particle Layer ----
  particleLayer: {
    ...StyleSheet.absoluteFillObject,
    zIndex: 2,
  },

  floatingParticle: {
    position: 'absolute',
    shadowColor: COLORS.accentWhite,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.5,
    shadowRadius: 4,
    elevation: 2,
  },

  // ---- Sparkle Layer ----
  sparkleLayer: {
    ...StyleSheet.absoluteFillObject,
    zIndex: 3,
  },

  sparkleContainer: {
    position: 'absolute',
  },

  // ---- Shimmer Layer ----
  shimmerLayer: {
    ...StyleSheet.absoluteFillObject,
    zIndex: 4,
  },

  shimmerLine: {
    position: 'absolute',
    height: 2,
    backgroundColor: COLORS.whiteTransparent40,
    borderRadius: 1,
    shadowColor: COLORS.accentWhite,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },

  // ---- Wave Layer ----
  waveLayer: {
    position: 'absolute',
    bottom: 0,
    left: -SCREEN_WIDTH * 0.25,
    right: -SCREEN_WIDTH * 0.25,
    height: verticalScale(200),
    zIndex: 5,
  },

  waveContainer: {
    position: 'absolute',
    left: 0,
    right: 0,
    height: verticalScale(100),
  },

  waveShape: {
    width: SCREEN_WIDTH * 1.5,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },

  // ---- Heartbeat Layer ----
  heartbeatLayer: {
    position: 'absolute',
    top: SCREEN_HEIGHT * 0.42,
    left: 0,
    right: 0,
    height: 50,
    zIndex: 6,
    overflow: 'hidden',
  },

  heartbeatContainer: {
    position: 'absolute',
    width: SCREEN_WIDTH * 2,
    height: 50,
    flexDirection: 'row',
    alignItems: 'center',
  },

  // ---- DNA Helix ----
  dnaHelixContainer: {
    position: 'absolute',
    right: moderateScale(15),
    top: SCREEN_HEIGHT * 0.2,
    width: LAYOUT.dnaHelixWidth * 2,
    height: LAYOUT.dnaHelixHeight,
    zIndex: 7,
    alignItems: 'center',
  },

  dnaHelixStrand: {
    position: 'absolute',
    width: LAYOUT.dnaHelixWidth,
    height: LAYOUT.dnaHelixHeight,
    alignItems: 'center',
  },

  dnaNode: {
    position: 'absolute',
    shadowColor: COLORS.medicalGreenLight,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.6,
    shadowRadius: 4,
    elevation: 3,
  },

  // ---- Hexagon Pattern ----
  hexPatternContainer: {
    ...StyleSheet.absoluteFillObject,
    zIndex: 1,
    opacity: 0.3,
  },

  // ---- Molecule ----
  moleculeContainer: {
    position: 'absolute',
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT,
    zIndex: 8,
  },

  // ---- Pulse Rings ----
  pulseRingContainer: {
    position: 'absolute',
    top: SCREEN_HEIGHT * 0.28,
    left: 0,
    right: 0,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 9,
  },

  pulseRing: {
    position: 'absolute',
    borderWidth: 2,
  },

  // ---- Orbital Rings ----
  orbitalContainer: {
    position: 'absolute',
    top: SCREEN_HEIGHT * 0.28,
    left: 0,
    right: 0,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 10,
  },

  orbitalRing: {
    position: 'absolute',
    borderWidth: 1.5,
  },

  // ---- Logo Section ----
  logoSection: {
    position: 'absolute',
    top: SCREEN_HEIGHT * 0.25,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 15,
  },

  medicalCrossContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: COLORS.medicalGreen,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 20,
    elevation: 10,
  },

  crossGlowRing: {
    position: 'absolute',
    backgroundColor: COLORS.medicalGreen,
  },

  crossShieldBg: {
    position: 'absolute',
    backgroundColor: COLORS.medicalGreen,
  },

  crossShieldBorder: {
    position: 'absolute',
    borderWidth: 2,
    borderColor: COLORS.whiteTransparent30,
    backgroundColor: 'transparent',
  },

  crossShieldInner: {
    position: 'absolute',
    backgroundColor: COLORS.medicalGreenDark,
    opacity: 0.3,
  },

  // ---- Brand Name ----
  brandNameContainer: {
    position: 'absolute',
    top: SCREEN_HEIGHT * 0.25 + LAYOUT.logoContainerSize + verticalScale(25),
    alignItems: 'center',
    zIndex: 16,
  },

  brandNameText: {
    fontSize: LAYOUT.brandNameFontSize,
    fontFamily: FONTS.brandName,
    fontWeight: '800',
    color: COLORS.accentWhite,
    letterSpacing: moderateScale(3),
    textShadowColor: COLORS.shadowGreen,
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 10,
  },

  brandNameUnderline: {
    width: moderateScale(80),
    height: 3,
    backgroundColor: COLORS.medicalGreen,
    borderRadius: 1.5,
    marginTop: verticalScale(8),
    shadowColor: COLORS.medicalGreen,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.6,
    shadowRadius: 8,
  },

  // ---- Tagline ----
  taglineContainer: {
    position: 'absolute',
    top: SCREEN_HEIGHT * 0.25 + LAYOUT.logoContainerSize + verticalScale(85),
    alignItems: 'center',
    zIndex: 17,
  },

  taglineLetterRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    paddingHorizontal: moderateScale(20),
  },

  taglineLetter: {
    fontFamily: FONTS.tagline,
    color: COLORS.whiteTransparent80,
    letterSpacing: 0.5,
  },

  taglineUnderline: {
    width: moderateScale(150),
    height: 1.5,
    backgroundColor: COLORS.medicalGreenLight,
    borderRadius: 0.75,
    marginTop: verticalScale(6),
    alignSelf: 'center',
    opacity: 0.5,
  },

  // ---- Loading Section ----
  loadingSection: {
    position: 'absolute',
    bottom: SCREEN_HEIGHT * 0.15,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 18,
  },

  loadingDotsContainer: {
    position: 'relative',
  },

  circularProgress: {
    position: 'absolute',
    top: -moderateScale(5),
    left: -moderateScale(5),
  },

  loadingText: {
    marginTop: verticalScale(20),
    fontSize: fontScale(12),
    fontFamily: FONTS.tagline,
    color: COLORS.whiteTransparent60,
    letterSpacing: 1,
  },

  // ---- Version ----
  versionContainer: {
    position: 'absolute',
    bottom: verticalScale(30),
    alignItems: 'center',
    zIndex: 19,
  },

  versionText: {
    fontSize: LAYOUT.versionFontSize,
    fontFamily: FONTS.version,
    color: COLORS.whiteTransparent40,
    letterSpacing: 1,
  },

  copyrightText: {
    fontSize: fontScale(9),
    fontFamily: FONTS.version,
    color: COLORS.whiteTransparent30,
    marginTop: verticalScale(4),
    letterSpacing: 0.5,
  },
});

// ============================================================
// EXPORT
// ============================================================

export default SplashScreen;
