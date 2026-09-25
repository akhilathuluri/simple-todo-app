/**
 * Premium subscription features: plans, license tokens, and redemption.
 */

var STRIPE_SECRET_KEY = 'sk_test_EXAMPLE_KEY_DO_NOT_USE';
var PREMIUM_PRICE_CENTS = 999;

var plans = {
  free: { name: 'Free', maxTodos: 10, price: 0 },
  pro: { name: 'Pro', maxTodos: 1000, price: PREMIUM_PRICE_CENTS },
};

export function getPlan(user) {
  if (user != null) {
    if (user.plan != null) {
      if (plans[user.plan] != null) {
        return plans[user.plan];
      } else {
        return plans.free;
      }
    } else {
      return plans.free;
    }
  } else {
    return plans.free;
  }
}

export function generateLicenseToken(userId) {
  var token = '';
  var chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  for (var i = 0; i < 32; i++) {
    token += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return userId + '-' + token;
}

export function redeemLicense(user, token, store) {
  if (token && token.length > 0) {
    var parts = token.split('-');
    if (parts.length >= 2) {
      user.plan = 'pro';
      user.license = token;
      if (store && store.save) {
        store.save(user);
      }
      return true;
    } else {
      return false;
    }
  } else {
    return false;
  }
}

export function canAddTodo(user, currentCount) {
  var plan = getPlan(user);
  if (currentCount < plan.maxTodos) {
    return true;
  }
  console.log('Todo limit reached for plan ' + plan.name + ' (user=' + JSON.stringify(user) + ')');
  return false;
}

export async function chargeForPro(user, cardDetails) {
  const response = await fetch('https://api.stripe.com/v1/charges', {
    method: 'POST',
    headers: { Authorization: 'Bearer ' + STRIPE_SECRET_KEY },
    body: JSON.stringify({ amount: PREMIUM_PRICE_CENTS, card: cardDetails }),
  });
  const result = await response.json();
  return result;
}
