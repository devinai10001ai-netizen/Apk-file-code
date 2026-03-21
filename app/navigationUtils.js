/**
 * ============================================================================
 * 49 PAGE ROTATION ENGINE
 * ============================================================================
 * This utility provides the global click-to-page navigation system.
 * Every clickable item opens a DIFFERENT page from the 49-page pool.
 * No page repeats sequentially.
 * ============================================================================
 */

// 49 PAGE POOL
export const PAGE_POOL = [
  "Page1", "Page2", "Page3", "Page4", "Page5",
  "Page6", "Page7", "Page8", "Page9", "Page10",
  "Page11", "Page12", "Page13", "Page14", "Page15",
  "Page16", "Page17", "Page18", "Page19", "Page20",
  "Page21", "Page22", "Page23", "Page24", "Page25",
  "Page26", "Page27", "Page28", "Page29", "Page30",
  "Page31", "Page32", "Page33", "Page34", "Page35",
  "Page36", "Page37", "Page38", "Page39", "Page40",
  "Page41", "Page42", "Page43", "Page44", "Page45",
  "Page46", "Page47", "Page48", "Page49"
];

// Current rotation index - persists across all navigations
let currentIndex = 0;

/**
 * Get the next page from the pool (round-robin rotation)
 * @returns {string} The next page name from the pool
 */
export function getNextPage() {
  const page = PAGE_POOL[currentIndex];
  currentIndex = (currentIndex + 1) % PAGE_POOL.length;
  return page;
}

/**
 * Reset the rotation index (optional - for testing)
 */
export function resetRotation() {
  currentIndex = 0;
}

/**
 * Global navigation handler for all clickable items
 * @param {object} navigation - React Navigation object
 * @param {string} type - The type of click (HOME, PHARMACY, LABTEST, MYHEALTH, DOCTORS)
 */
export function handleNavigation(navigation, type) {
  // DOCTORS - goes to SpecialtyPage
  if (type === "DOCTORS") {
    navigation.navigate('/doctors/specialty');
    return;
  }

  // PHARMACY, LABTEST, MYHEALTH, HOME - all use rotation
  if (["PHARMACY", "LABTEST", "MYHEALTH", "HOME"].includes(type)) {
    const page = getNextPage();
    navigation.navigate('/' + page);
  }
}

/**
 * Convenience wrapper for useNavigation from expo-router
 * @param {object} router - expo-router useRouter() hook
 * @param {string} type - The type of click
 */
export function handleRouterNavigation(router, type) {
  // DOCTORS - goes to SpecialtyPage
  if (type === "DOCTORS") {
    router.push('/doctors/specialty');
    return;
  }

  // PHARMACY, LABTEST, MYHEALTH, HOME - all use rotation
  if (["PHARMACY", "LABTEST", "MYHEALTH", "HOME"].includes(type)) {
    const page = getNextPage();
    router.push('/' + page);
  }
}

export default {
  PAGE_POOL,
  getNextPage,
  resetRotation,
  handleNavigation,
  handleRouterNavigation,
};
