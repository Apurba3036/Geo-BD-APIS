import { motion, AnimatePresence } from 'framer-motion'
import { Shield, Check, X, Scale } from 'lucide-react'

const WHOTermsModal = ({ isOpen, onAccept, onCancel }) => {
  if (!isOpen) return null

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/70 backdrop-blur-md">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 30 }}
          className="bg-[var(--bg)] border border-[var(--border)] rounded-[2rem] w-full max-w-3xl max-h-[85vh] overflow-hidden flex flex-col shadow-2xl relative"
        >
          {/* Decorative Background Element */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full -mr-32 -mt-32 blur-3xl pointer-events-none" />
          
          {/* Header */}
          <div className="p-8 border-b border-[var(--border)] bg-primary/5 flex items-center gap-4 relative">
            <div className="p-3 bg-primary/10 rounded-2xl">
              <Shield className="w-8 h-8 text-primary" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-[var(--text)]">WHO Data Terms & Conditions</h2>
              <p className="text-sm text-[var(--text-muted)] font-medium">Please read and agree before continuing</p>
            </div>
          </div>

          {/* Content */}
          <div className="p-8 overflow-y-auto custom-scrollbar flex-1 text-sm leading-relaxed text-[var(--text-muted)] space-y-6">
            <section className="space-y-3">
              <h3 className="text-[var(--text)] font-bold flex items-center gap-2">
                <Scale className="w-4 h-4 text-primary" />
                Copyright Attribution 4.0 International (CC BY 4.0)
              </h3>
              <div className="bg-[var(--bg-secondary)] p-6 rounded-2xl border border-[var(--border)] italic text-[var(--text-muted)] border-l-4 border-l-primary">
                "The World Health Organization (“WHO”) encourages public access and use of the data that it
                collects and publishes on its web site data.who.int. The data are organized in datasets and made
                available in machine-readable format (“Datasets”). The Datasets have been compiled from data
                provided by WHO’s Member States under the WHO policy on the use and sharing of data
                collected by WHO in Member States outside the context of public health emergencies."
              </div>
            </section>

            <section className="space-y-4">
              <p>
                Use of the data derived from the Datasets, which may appear in formats such as tables and charts,
                is also subject to these Terms and Conditions. Datasets may include data describing the Dataset
                called “Metadata”. If any datasets are credited to a source other than WHO, then those materials
                are not covered by these Terms and Conditions, and permission should be sought from the source
                provided.
              </p>
              
              <div className="p-4 bg-amber-500/5 rounded-xl border border-amber-500/10 text-amber-700 dark:text-amber-400 text-xs font-medium">
                ⚠️ You are responsible for determining if this is the case, and if so, you are responsible for
                obtaining any necessary permission from the sources indicated. The risk of claims resulting from
                infringement of any third-party-owned component in the materials rests solely with you.
              </div>

              <p>
                You may use our application programming interfaces (“APIs”) to facilitate access to the Datasets,
                whether through a separate web site or through another type of software application. By using the
                Datasets or any presentations of data derived from them, or by using our APIs in connection with
                the Datasets, you agree to be bound by these Terms and Conditions, as may be amended from time
                to time by WHO at its sole discretion.
              </p>

              <p>
                Unless specifically indicated otherwise, these Datasets are provided to you under a Creative
                Commons Attribution 4.0 International License (CC BY 4.0), with the additional terms below. 
                By downloading or using the Datasets, you agree to comply with the terms of the CC BY 4.0 license, 
                as well as the following mandatory and binding addition:
              </p>

              <div className="p-5 bg-primary/5 rounded-2xl border border-primary/10 border-r-4 border-r-primary">
                <p className="font-semibold text-[var(--text)] underline mb-2">Dispute Resolution:</p>
                "Any dispute relating to the interpretation or application of this license shall, unless amicably
                settled, be subject to conciliation. In the event of failure of the latter, the dispute shall be settled by
                arbitration. The arbitration shall be conducted in accordance with the modalities to be agreed upon
                by the parties or, in the absence of agreement, with the UNCITRAL Arbitration Rules. The parties
                shall accept the arbitral award as final."
              </div>
            </section>

            <section className="space-y-4 pt-4 border-t border-[var(--border)]">
              <h3 className="font-bold text-red-500 flex items-center gap-2">
                <X className="w-5 h-5" />
                Prohibited Uses:
              </h3>
              <ul className="space-y-3">
                <li className="flex gap-3 items-start">
                  <div className="w-1.5 h-1.5 rounded-full bg-red-500 mt-2 shrink-0" />
                  <span>You shall not attempt to de-anonymise the Datasets or use the Datasets in a manner that falsifies or misrepresents their content.</span>
                </li>
                <li className="flex gap-3 items-start">
                  <div className="w-1.5 h-1.5 rounded-full bg-red-500 mt-2 shrink-0" />
                  <span>You shall not, in connection with your use of the Datasets published on data.who.int, state or imply that WHO endorses, or is affiliated with, you, or that WHO endorses your use of data.who.int, or any content, output, or analysis resulting from or related to the data.who.int, or any entity, organization, company, product or services.</span>
                </li>
              </ul>
            </section>
          </div>

          {/* Footer */}
          <div className="p-8 border-t border-[var(--border)] bg-[var(--bg-secondary)] flex flex-col sm:flex-row gap-4">
            <button
              onClick={onCancel}
              className="px-8 py-4 rounded-2xl border border-[var(--border)] hover:bg-[var(--bg)] transition-all font-medium text-[var(--text-muted)] active:scale-95"
            >
              Cancel
            </button>
            <button
              onClick={onAccept}
              className="flex-1 px-8 py-4 bg-primary text-white rounded-2xl font-bold flex items-center justify-center gap-3 shadow-xl shadow-primary/20 hover:bg-primary-dark transition-all active:scale-95"
            >
              <Check className="w-6 h-6" />
              I Agree & Access Data
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  )
}

export default WHOTermsModal
