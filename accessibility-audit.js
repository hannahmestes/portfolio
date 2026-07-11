const AxeBuilder = require('@axe-core/webdriverjs');
const { Builder } = require('selenium-webdriver');

async function runAccessibilityAudit() {
  const driver = await new Builder().forBrowser('chrome').build();

  try {
    await driver.get('file:///Users/hanbot/dev/portfolio/index.html');

    const results = await new AxeBuilder(driver)
      .withTags(['wcag2a', 'wcag2aa', 'wcag21aa'])
      .analyze();

    console.log('\n=== ACCESSIBILITY AUDIT RESULTS ===\n');
    console.log(`Total Issues Found: ${results.violations.length + results.passes.length + results.incomplete.length}`);

    console.log('\n❌ VIOLATIONS (must fix):');
    if (results.violations.length === 0) {
      console.log('  None! Great job!');
    } else {
      results.violations.forEach((violation, index) => {
        console.log(`\n${index + 1}. ${violation.id}: ${violation.description}`);
        console.log(`   Impact: ${violation.impact}`);
        console.log(`   Help: ${violation.help}`);
        console.log(`   Help URL: ${violation.helpUrl}`);
        console.log(`   Affected Elements: ${violation.nodes.length}`);
        violation.nodes.forEach(node => {
          console.log(`     - ${node.target.join(', ')}`);
          console.log(`       HTML: ${node.html.substring(0, 100)}...`);
        });
      });
    }

    console.log('\n⚠️  NEEDS REVIEW (incomplete):');
    if (results.incomplete.length === 0) {
      console.log('  None!');
    } else {
      results.incomplete.forEach((issue, index) => {
        console.log(`\n${index + 1}. ${issue.id}: ${issue.description}`);
        console.log(`   Help: ${issue.help}`);
        console.log(`   Affected Elements: ${issue.nodes.length}`);
      });
    }

    console.log('\n✅ PASSES:');
    console.log(`  ${results.passes.length} tests passed`);

    console.log('\n=== END AUDIT ===\n');

    return results;
  } finally {
    await driver.quit();
  }
}

runAccessibilityAudit().catch(console.error);
